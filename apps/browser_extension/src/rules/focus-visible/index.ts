import { isFocusable } from "@a11y-visualizer/dom-utils";
import type { RuleObject } from "../type";

const ruleName = "focus-visible";
const defaultOptions = { enabled: true };

/**
 * Check if focus indicator styles have been explicitly suppressed
 */
const hasFocusSuppressed = (element: Element): boolean => {
  const style = getComputedStyle(element);

  // Check for outline: none or outline: 0
  if (style.outlineStyle === "none" || style.outlineWidth === "0px") {
    // Also check if there's no compensating box-shadow or border
    const hasNoBoxShadow = style.boxShadow === "none" || style.boxShadow === "";
    const hasThinBorder =
      parseInt(style.borderWidth, 10) <= 1 || style.borderStyle === "none";

    // If outline is suppressed and no alternative focus styles, it's a problem
    if (hasNoBoxShadow && hasThinBorder) {
      return true;
    }
  }

  return false;
};

/**
 * Focus visible rule - checks WCAG 2.4.7 Focus Visible
 * Warns when focus indicators appear to be suppressed
 */
export const FocusVisible: RuleObject = {
  ruleName,
  defaultOptions,
  selectors: [
    "a[href]",
    "button",
    "input:not([type=hidden])",
    "select",
    "textarea",
    "[tabindex]",
  ],
  evaluate: (element, { enabled }) => {
    if (!enabled) return undefined;

    // Only check keyboard-focusable elements
    if (!isFocusable(element, true)) {
      return undefined;
    }

    // Check if focus styles appear to be suppressed
    if (hasFocusSuppressed(element)) {
      return [
        {
          ruleName,
          type: "warning",
          message: "Focus indicator may be suppressed",
        },
      ];
    }

    return undefined;
  },
};
