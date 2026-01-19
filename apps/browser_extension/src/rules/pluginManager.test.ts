import { afterEach, describe, expect, test, vi } from "vitest";
import {
  createPlugin,
  createRule,
  pluginManager,
  type RulePlugin,
} from "./pluginManager";

describe("pluginManager", () => {
  afterEach(() => {
    pluginManager.clear();
  });

  const createTestPlugin = (id = "test-plugin"): RulePlugin => ({
    id,
    name: "Test Plugin",
    version: "1.0.0",
    rules: [
      createRule({
        ruleName: "test-rule",
        defaultOptions: { enabled: true },
        evaluate: () => undefined,
      }),
    ],
  });

  test("registers a plugin", () => {
    const plugin = createTestPlugin();
    const result = pluginManager.registerPlugin(plugin);

    expect(result).toBe(true);
    expect(pluginManager.hasPlugin("test-plugin")).toBe(true);
  });

  test("prevents duplicate plugin registration", () => {
    const plugin = createTestPlugin();
    pluginManager.registerPlugin(plugin);

    const result = pluginManager.registerPlugin(plugin);
    expect(result).toBe(false);
  });

  test("unregisters a plugin", () => {
    const plugin = createTestPlugin();
    pluginManager.registerPlugin(plugin);

    const result = pluginManager.unregisterPlugin("test-plugin");
    expect(result).toBe(true);
    expect(pluginManager.hasPlugin("test-plugin")).toBe(false);
  });

  test("returns false when unregistering non-existent plugin", () => {
    const result = pluginManager.unregisterPlugin("non-existent");
    expect(result).toBe(false);
  });

  test("enables and disables plugins", () => {
    const plugin = createTestPlugin();
    pluginManager.registerPlugin(plugin);

    expect(pluginManager.isPluginEnabled("test-plugin")).toBe(true);

    pluginManager.disablePlugin("test-plugin");
    expect(pluginManager.isPluginEnabled("test-plugin")).toBe(false);

    pluginManager.enablePlugin("test-plugin");
    expect(pluginManager.isPluginEnabled("test-plugin")).toBe(true);
  });

  test("getPlugins returns all registered plugins", () => {
    pluginManager.registerPlugin(createTestPlugin("plugin-1"));
    pluginManager.registerPlugin(createTestPlugin("plugin-2"));

    const plugins = pluginManager.getPlugins();
    expect(plugins.length).toBe(2);
  });

  test("getEnabledPlugins returns only enabled plugins", () => {
    pluginManager.registerPlugin(createTestPlugin("plugin-1"));
    pluginManager.registerPlugin(createTestPlugin("plugin-2"));
    pluginManager.disablePlugin("plugin-1");

    const enabled = pluginManager.getEnabledPlugins();
    expect(enabled.length).toBe(1);
    expect(enabled[0].id).toBe("plugin-2");
  });

  test("getPluginRules returns rules from enabled plugins", () => {
    pluginManager.registerPlugin(createTestPlugin("plugin-1"));
    pluginManager.registerPlugin(createTestPlugin("plugin-2"));

    const rules = pluginManager.getPluginRules();
    expect(rules.length).toBe(2);
  });

  test("notifies listeners on changes", () => {
    const listener = vi.fn();
    pluginManager.subscribe(listener);

    pluginManager.registerPlugin(createTestPlugin());
    expect(listener).toHaveBeenCalledTimes(1);

    pluginManager.disablePlugin("test-plugin");
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test("unsubscribe stops notifications", () => {
    const listener = vi.fn();
    const unsubscribe = pluginManager.subscribe(listener);

    unsubscribe();
    pluginManager.registerPlugin(createTestPlugin());

    expect(listener).not.toHaveBeenCalled();
  });

  test("createPlugin prefixes rule names with plugin id", () => {
    const plugin = createPlugin({
      id: "my-plugin",
      name: "My Plugin",
      version: "1.0.0",
      rules: [
        createRule({
          ruleName: "my-rule",
          defaultOptions: { enabled: true },
          evaluate: () => undefined,
        }),
      ],
    });

    expect(plugin.rules[0].ruleName).toBe("my-plugin:my-rule");
  });
});
