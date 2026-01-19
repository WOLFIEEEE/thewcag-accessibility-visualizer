/**
 * Color contrast calculation utilities following WCAG 2.1 guidelines
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

/**
 * Parse a CSS color string to RGBA values
 */
export const parseColor = (color: string): RGBA | null => {
  // Handle rgba/rgb
  const rgbaMatch = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/,
  );
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  // Handle hex colors
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: 1,
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
        a: 1,
      };
    }
    if (hex.length === 8) {
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
        a: parseInt(hex.substring(6, 8), 16) / 255,
      };
    }
  }

  // Handle named colors by creating a temporary element
  if (typeof document !== "undefined") {
    const temp = document.createElement("div");
    temp.style.color = color;
    document.body.appendChild(temp);
    const computedColor = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    if (computedColor && computedColor !== color) {
      return parseColor(computedColor);
    }
  }

  return null;
};

/**
 * Convert sRGB value to linear RGB
 */
const sRGBtoLinear = (value: number): number => {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export const getRelativeLuminance = (color: RGB): number => {
  const r = sRGBtoLinear(color.r);
  const g = sRGBtoLinear(color.g);
  const b = sRGBtoLinear(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export const getContrastRatio = (color1: RGB, color2: RGB): number => {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Blend a color with alpha over a background color
 */
export const blendColors = (foreground: RGBA, background: RGB): RGB => {
  const alpha = foreground.a;
  return {
    r: Math.round(foreground.r * alpha + background.r * (1 - alpha)),
    g: Math.round(foreground.g * alpha + background.g * (1 - alpha)),
    b: Math.round(foreground.b * alpha + background.b * (1 - alpha)),
  };
};

/**
 * Get effective background color by traversing up the DOM tree
 */
export const getEffectiveBackgroundColor = (element: Element): RGB => {
  const defaultBg: RGB = { r: 255, g: 255, b: 255 }; // White default
  let current: Element | null = element;
  const layers: RGBA[] = [];

  while (current && current !== document.documentElement) {
    const style = getComputedStyle(current);
    const bgColor = parseColor(style.backgroundColor);

    if (bgColor && bgColor.a > 0) {
      layers.unshift(bgColor);
      // If fully opaque, stop here
      if (bgColor.a >= 1) {
        break;
      }
    }
    current = current.parentElement;
  }

  // Blend all layers starting from the default background
  let result = defaultBg;
  for (const layer of layers) {
    result = blendColors(layer, result);
  }

  return result;
};

/**
 * Get the foreground (text) color of an element
 */
export const getForegroundColor = (element: Element): RGBA | null => {
  const style = getComputedStyle(element);
  return parseColor(style.color);
};

/**
 * Check if text is "large" according to WCAG
 * Large text is 18pt (24px) or 14pt (18.5px) bold
 */
export const isLargeText = (element: Element): boolean => {
  const style = getComputedStyle(element);
  const fontSize = parseFloat(style.fontSize);
  const fontWeight = parseInt(style.fontWeight, 10) || 400;
  const isBold = fontWeight >= 700 || style.fontWeight === "bold";

  // 18pt = 24px, 14pt = 18.67px
  return fontSize >= 24 || (fontSize >= 18.67 && isBold);
};

/**
 * WCAG contrast requirements
 */
export const WCAG_REQUIREMENTS = {
  AA: {
    normalText: 4.5,
    largeText: 3,
    uiComponents: 3,
  },
  AAA: {
    normalText: 7,
    largeText: 4.5,
    uiComponents: 3,
  },
} as const;

/**
 * Check if contrast ratio meets WCAG AA requirements
 */
export const meetsAA = (ratio: number, isLarge: boolean): boolean => {
  const requirement = isLarge
    ? WCAG_REQUIREMENTS.AA.largeText
    : WCAG_REQUIREMENTS.AA.normalText;
  return ratio >= requirement;
};

/**
 * Check if contrast ratio meets WCAG AAA requirements
 */
export const meetsAAA = (ratio: number, isLarge: boolean): boolean => {
  const requirement = isLarge
    ? WCAG_REQUIREMENTS.AAA.largeText
    : WCAG_REQUIREMENTS.AAA.normalText;
  return ratio >= requirement;
};

/**
 * Check contrast for a text element and return details
 */
export const checkTextContrast = (
  element: Element,
): {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  isLarge: boolean;
  foreground: RGBA | null;
  background: RGB;
} | null => {
  const foreground = getForegroundColor(element);
  if (!foreground) return null;

  const background = getEffectiveBackgroundColor(element);
  const blendedForeground = blendColors(foreground, background);
  const ratio = getContrastRatio(blendedForeground, background);
  const isLarge = isLargeText(element);

  return {
    ratio,
    meetsAA: meetsAA(ratio, isLarge),
    meetsAAA: meetsAAA(ratio, isLarge),
    isLarge,
    foreground,
    background,
  };
};
