/**
 * Rule Plugin Manager
 *
 * Allows registration and management of custom accessibility rules.
 * This provides an extensible architecture for adding rules without
 * modifying the core codebase.
 */

import type { RuleEvaluationCondition, RuleObject } from "./type";

/**
 * Custom rule plugin interface
 */
export interface RulePlugin {
  /** Unique identifier for the plugin */
  id: string;
  /** Display name for the plugin */
  name: string;
  /** Plugin version */
  version: string;
  /** Author or organization */
  author?: string;
  /** WCAG criteria this plugin helps test */
  wcagCriteria?: string[];
  /** Rules provided by this plugin */
  rules: RuleObject[];
}

/**
 * Registered plugin metadata
 */
interface RegisteredPlugin {
  plugin: RulePlugin;
  enabled: boolean;
  registeredAt: number;
}

/**
 * Plugin Manager singleton
 */
class RulePluginManager {
  private plugins: Map<string, RegisteredPlugin> = new Map();
  private listeners: Set<() => void> = new Set();

  /**
   * Register a new plugin
   */
  registerPlugin(plugin: RulePlugin): boolean {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin "${plugin.id}" is already registered`);
      return false;
    }

    // Validate plugin structure
    if (!plugin.id || !plugin.name || !plugin.rules) {
      console.error("Invalid plugin structure");
      return false;
    }

    // Validate each rule
    for (const rule of plugin.rules) {
      if (!rule.ruleName || !rule.evaluate) {
        console.error(`Invalid rule in plugin "${plugin.id}"`);
        return false;
      }
    }

    this.plugins.set(plugin.id, {
      plugin,
      enabled: true,
      registeredAt: Date.now(),
    });

    this.notifyListeners();
    return true;
  }

  /**
   * Unregister a plugin
   */
  unregisterPlugin(pluginId: string): boolean {
    const existed = this.plugins.delete(pluginId);
    if (existed) {
      this.notifyListeners();
    }
    return existed;
  }

  /**
   * Enable a plugin
   */
  enablePlugin(pluginId: string): boolean {
    const registered = this.plugins.get(pluginId);
    if (registered) {
      registered.enabled = true;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  /**
   * Disable a plugin
   */
  disablePlugin(pluginId: string): boolean {
    const registered = this.plugins.get(pluginId);
    if (registered) {
      registered.enabled = false;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  /**
   * Get all registered plugins
   */
  getPlugins(): RulePlugin[] {
    return Array.from(this.plugins.values()).map((r) => r.plugin);
  }

  /**
   * Get all enabled plugins
   */
  getEnabledPlugins(): RulePlugin[] {
    return Array.from(this.plugins.values())
      .filter((r) => r.enabled)
      .map((r) => r.plugin);
  }

  /**
   * Get all rules from enabled plugins
   */
  getPluginRules(): RuleObject[] {
    return this.getEnabledPlugins().flatMap((p) => p.rules);
  }

  /**
   * Check if a plugin is registered
   */
  hasPlugin(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  /**
   * Check if a plugin is enabled
   */
  isPluginEnabled(pluginId: string): boolean {
    const registered = this.plugins.get(pluginId);
    return registered?.enabled ?? false;
  }

  /**
   * Subscribe to plugin changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Clear all plugins (for testing)
   */
  clear(): void {
    this.plugins.clear();
    this.notifyListeners();
  }
}

// Export singleton instance
export const pluginManager = new RulePluginManager();

/**
 * Helper function to create a rule
 */
export const createRule = <
  Options extends { enabled: boolean } = { enabled: boolean },
  Condition extends RuleEvaluationCondition = RuleEvaluationCondition,
>(
  rule: RuleObject<Options, Condition>,
): RuleObject<Options, Condition> => rule;

/**
 * Helper function to create a plugin
 */
export const createPlugin = (plugin: RulePlugin): RulePlugin => {
  return {
    ...plugin,
    rules: plugin.rules.map((rule) => ({
      ...rule,
      ruleName: `${plugin.id}:${rule.ruleName}`,
    })),
  };
};
