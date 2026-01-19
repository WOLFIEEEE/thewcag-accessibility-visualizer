import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { SkipLink } from "./index";

describe("skip-link", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  const evaluate = (element: Element) =>
    SkipLink.evaluate(element, SkipLink.defaultOptions, {
      elementDocument: document,
    });

  test("returns undefined when disabled", () => {
    const result = SkipLink.evaluate(document.body, { enabled: false }, {});
    expect(result).toBeUndefined();
  });

  test("returns undefined for non-body elements", () => {
    const element = document.createElement("div");
    container.appendChild(element);

    const result = evaluate(element);
    expect(result).toBeUndefined();
  });

  test("warns when no skip link is found", () => {
    // Create a page without skip link
    container.innerHTML = `
      <button>Button 1</button>
      <a href="https://example.com">External link</a>
    `;

    const result = evaluate(document.body);
    expect(result).toBeDefined();
    expect(result?.some((r) => r.type === "warning")).toBe(true);
  });

  test("passes when skip link is first focusable element", () => {
    // Create a main content target
    const mainContent = document.createElement("main");
    mainContent.id = "main-content";
    container.appendChild(mainContent);

    // Create skip link
    container.innerHTML = `
      <a href="#main-content">Skip to main content</a>
      <nav>Navigation</nav>
      <main id="main-content">Main content</main>
    `;

    const result = evaluate(document.body);
    // Should not have warnings if skip link is found
    expect(result?.some((r) => r.type === "warning")).toBeFalsy();
  });

  test("passes when skip link is within first few focusable elements", () => {
    container.innerHTML = `
      <button>Logo button</button>
      <a href="#main">Skip to content</a>
      <nav>Navigation</nav>
      <main id="main">Main content</main>
    `;

    const result = evaluate(document.body);
    expect(result?.some((r) => r.type === "warning")).toBeFalsy();
  });

  test("warns when skip link target does not exist", () => {
    container.innerHTML = `
      <a href="#nonexistent">Skip to content</a>
      <nav>Navigation</nav>
    `;

    const result = evaluate(document.body);
    expect(result).toBeDefined();
    expect(result?.some((r) => r.type === "warning")).toBe(true);
  });
});
