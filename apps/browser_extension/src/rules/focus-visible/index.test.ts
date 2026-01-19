import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { FocusVisible } from "./index";

describe("focus-visible", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  const evaluate = (element: Element) =>
    FocusVisible.evaluate(element, FocusVisible.defaultOptions, {});

  test("returns undefined for non-focusable elements", () => {
    const element = document.createElement("div");
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("returns undefined for focusable elements with default styles", () => {
    const element = document.createElement("button");
    element.textContent = "Click me";
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("returns undefined when disabled", () => {
    const element = document.createElement("button");
    element.textContent = "Click me";
    container.appendChild(element);

    const result = FocusVisible.evaluate(element, { enabled: false }, {});
    expect(result).toBeUndefined();
  });

  test("returns undefined for elements with tabindex=-1", () => {
    const element = document.createElement("div");
    element.tabIndex = -1; // Focusable but not keyboard-focusable
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("checks links with href", () => {
    const element = document.createElement("a");
    element.href = "https://example.com";
    element.textContent = "Link";
    container.appendChild(element);

    const result = evaluate(element);
    // Should not error for default styles
    expect(result?.some((r) => r.type === "error")).toBeFalsy();
  });
});
