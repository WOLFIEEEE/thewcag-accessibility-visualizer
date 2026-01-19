import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { TextContrast } from "./index";

// Note: Color contrast tests that rely on getComputedStyle don't work reliably in jsdom
// because jsdom doesn't properly compute CSS colors. These tests are better run in a real browser.
describe("text-contrast", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  const evaluate = (element: Element) =>
    TextContrast.evaluate(element, TextContrast.defaultOptions, {});

  test("skips elements without text content", () => {
    const element = document.createElement("p");
    element.innerHTML = "<span></span>";
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("skips hidden elements", () => {
    const element = document.createElement("p");
    element.textContent = "Test text";
    element.style.display = "none";
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("skips elements with visibility hidden", () => {
    const element = document.createElement("p");
    element.textContent = "Test text";
    element.style.visibility = "hidden";
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("returns undefined when disabled", () => {
    const element = document.createElement("p");
    element.textContent = "Test text";
    container.appendChild(element);

    const result = TextContrast.evaluate(element, { enabled: false }, {});
    expect(result).toBeUndefined();
  });
});
