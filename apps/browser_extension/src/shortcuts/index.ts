import type { PresetId, Settings } from "../settings/types";

/**
 * Keyboard shortcut command definitions
 * These correspond to the commands defined in the manifest
 */
export const SHORTCUT_COMMANDS = {
  toggleExtension: "toggle-extension",
  toggleTips: "toggle-tips",
  toggleLiveRegions: "toggle-live-regions",
  presetBasic: "preset-basic",
  presetStructure: "preset-structure",
  presetContent: "preset-content",
} as const;

export type ShortcutCommand =
  (typeof SHORTCUT_COMMANDS)[keyof typeof SHORTCUT_COMMANDS];

/**
 * Apply preset to settings
 */
export const applyPresetToSettings = (
  settings: Settings,
  presetId: PresetId,
): Settings => {
  if (presetId === "custom") {
    return settings;
  }
  return {
    ...settings,
    elementTypeMode: {
      mode: "preset",
      presetId,
    },
  };
};

/**
 * Toggle tips in settings
 */
export const toggleTipsInSettings = (settings: Settings): Settings => ({
  ...settings,
  hideTips: !settings.hideTips,
});

/**
 * Toggle live regions in settings
 */
export const toggleLiveRegionsInSettings = (settings: Settings): Settings => ({
  ...settings,
  showLiveRegions: !settings.showLiveRegions,
});
