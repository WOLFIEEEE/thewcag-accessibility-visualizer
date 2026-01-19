import type { RuleEvaluationCondition, RuleObject } from "../type";

const ruleName = "skip-link";
const defaultOptions = { enabled: true };

/**
 * Check if an element is a skip link (link to internal anchor)
 */
const isSkipLink = (element: Element): boolean => {
  if (element.tagName.toLowerCase() !== "a") return false;

  const href = element.getAttribute("href");
  if (!href) return false;

  // Check if it's an internal anchor link
  return href.startsWith("#") && href.length > 1;
};

/**
 * Check if the skip link target exists
 */
const skipLinkTargetExists = (element: Element, doc: Document): boolean => {
  const href = element.getAttribute("href");
  if (!href || !href.startsWith("#")) return false;

  const targetId = href.substring(1);
  const target = doc.getElementById(targetId);

  return target !== null;
};

/**
 * Skip link rule - checks WCAG 2.4.1 Bypass Blocks
 * Checks if the page has a skip link as one of the first focusable elements
 */
export const SkipLink: RuleObject<
  { enabled: boolean },
  RuleEvaluationCondition & { elementDocument?: Document }
> = {
  ruleName,
  defaultOptions,
  tagNames: ["body"],
  evaluate: (element, { enabled }, condition) => {
    if (!enabled) return undefined;

    // Only evaluate on body element and only once per page
    if (element.tagName.toLowerCase() !== "body") return undefined;

    const doc = condition.elementDocument || element.ownerDocument;
    if (!doc) return undefined;

    // Find the first few focusable elements
    const focusableSelector =
      'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = doc.querySelectorAll(focusableSelector);

    // Check the first 3 focusable elements for skip links
    let foundSkipLink = false;
    const elementsToCheck = Math.min(focusableElements.length, 5);

    for (let i = 0; i < elementsToCheck; i++) {
      const el = focusableElements[i];
      if (isSkipLink(el) && skipLinkTargetExists(el, doc)) {
        foundSkipLink = true;
        break;
      }
    }

    if (!foundSkipLink) {
      return [
        {
          ruleName,
          type: "warning",
          message: "No skip link found",
        },
      ];
    }

    return undefined;
  },
};
