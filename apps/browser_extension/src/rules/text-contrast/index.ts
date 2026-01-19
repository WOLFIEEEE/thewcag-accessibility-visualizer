import {
  checkTextContrast,
  WCAG_REQUIREMENTS,
} from "../../utils/colorContrast";
import type { RuleObject } from "../type";

const ruleName = "text-contrast";
const defaultOptions = { enabled: true };

/**
 * Check if element has visible text content
 */
const hasTextContent = (element: Element): boolean => {
  // Check direct text nodes
  for (const node of element.childNodes) {
    if (
      node.nodeType === Node.TEXT_NODE &&
      node.textContent &&
      node.textContent.trim().length > 0
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Check if element is visible
 */
const isVisible = (element: Element): boolean => {
  const style = getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    parseFloat(style.opacity) > 0
  );
};

/**
 * Text contrast rule - checks WCAG 1.4.3 contrast requirements
 */
export const TextContrast: RuleObject = {
  ruleName,
  defaultOptions,
  tagNames: [
    "p",
    "span",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "li",
    "td",
    "th",
    "label",
    "button",
    "legend",
  ],
  evaluate: (element, { enabled }) => {
    if (!enabled) return undefined;

    // Skip if not visible or no text content
    if (!isVisible(element) || !hasTextContent(element)) {
      return undefined;
    }

    const result = checkTextContrast(element);
    if (!result) return undefined;

    const { ratio, meetsAA, isLarge } = result;

    // Round ratio to 2 decimal places for display
    const roundedRatio = Math.round(ratio * 100) / 100;

    if (!meetsAA) {
      const requiredRatio = isLarge
        ? WCAG_REQUIREMENTS.AA.largeText
        : WCAG_REQUIREMENTS.AA.normalText;

      return [
        {
          ruleName,
          type: "error",
          message: "Insufficient color contrast",
          messageParams: {
            ratio: roundedRatio.toString(),
            required: requiredRatio.toString(),
          },
        },
      ];
    }

    return undefined;
  },
};
