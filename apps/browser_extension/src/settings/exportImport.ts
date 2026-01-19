import { browser } from "#imports";
import {
  DEFAULT_SETTING_KEY,
  FILE_SETTING_KEY,
  initialSettings,
} from "./constants";
import type { Settings } from "./types";

/**
 * Export format version for future compatibility
 */
const EXPORT_VERSION = 1;

/**
 * Exported settings structure
 */
export interface ExportedSettings {
  version: number;
  exportDate: string;
  defaultSettings: Settings;
  hostSettings: Record<string, Settings>;
}

/**
 * Get all host settings from storage
 */
const getAllHostSettings = async (): Promise<Record<string, Settings>> => {
  const allStorage = await browser.storage.sync.get(null);
  const hostSettings: Record<string, Settings> = {};

  for (const [key, value] of Object.entries(allStorage)) {
    // Skip default settings key, file settings key, and custom settings keys
    if (
      key === DEFAULT_SETTING_KEY ||
      key === FILE_SETTING_KEY ||
      key.endsWith(":custom")
    ) {
      continue;
    }
    // Only include host-like keys (should contain a dot for domain names)
    if (key.includes(".") || key === FILE_SETTING_KEY) {
      hostSettings[key] = value as Settings;
    }
  }

  return hostSettings;
};

/**
 * Validate exported settings structure
 */
const validateExportedSettings = (data: unknown): data is ExportedSettings => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.version !== "number") {
    return false;
  }

  if (typeof obj.exportDate !== "string") {
    return false;
  }

  if (typeof obj.defaultSettings !== "object" || obj.defaultSettings === null) {
    return false;
  }

  if (typeof obj.hostSettings !== "object" || obj.hostSettings === null) {
    return false;
  }

  return true;
};

/**
 * Validate individual settings object
 */
const validateSettings = (settings: unknown): settings is Settings => {
  if (typeof settings !== "object" || settings === null) {
    return false;
  }

  const obj = settings as Record<string, unknown>;

  // Check for required fields
  const requiredFields = [
    "accessibilityInfo",
    "interactiveMode",
    "hideTips",
    "showLiveRegions",
    "elementTypeMode",
  ];

  for (const field of requiredFields) {
    if (!(field in obj)) {
      return false;
    }
  }

  return true;
};

/**
 * Merge imported settings with defaults to ensure all fields are present
 */
const mergeWithDefaults = (settings: Partial<Settings>): Settings => {
  return {
    ...initialSettings,
    ...settings,
  };
};

/**
 * Export all settings to JSON string
 */
export const exportSettings = async (): Promise<string> => {
  const allStorage = await browser.storage.sync.get(DEFAULT_SETTING_KEY);
  const defaultSettings =
    (allStorage[DEFAULT_SETTING_KEY] as Settings) || initialSettings;
  const hostSettings = await getAllHostSettings();

  const exportData: ExportedSettings = {
    version: EXPORT_VERSION,
    exportDate: new Date().toISOString(),
    defaultSettings,
    hostSettings,
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Import settings from JSON string
 * Returns the number of host settings imported
 */
export const importSettings = async (
  json: string,
): Promise<{ success: boolean; hostCount: number; error?: string }> => {
  try {
    const data = JSON.parse(json);

    if (!validateExportedSettings(data)) {
      return {
        success: false,
        hostCount: 0,
        error: "Invalid settings file format",
      };
    }

    // Validate default settings
    if (!validateSettings(data.defaultSettings)) {
      return {
        success: false,
        hostCount: 0,
        error: "Invalid default settings format",
      };
    }

    // Merge with current defaults to handle version differences
    const mergedDefaultSettings = mergeWithDefaults(data.defaultSettings);

    // Save default settings
    await browser.storage.sync.set({
      [DEFAULT_SETTING_KEY]: mergedDefaultSettings,
    });

    // Save host settings
    let hostCount = 0;
    for (const [host, settings] of Object.entries(data.hostSettings)) {
      if (validateSettings(settings)) {
        const mergedSettings = mergeWithDefaults(settings);
        await browser.storage.sync.set({ [host]: mergedSettings });
        hostCount++;
      }
    }

    return {
      success: true,
      hostCount,
    };
  } catch (error) {
    return {
      success: false,
      hostCount: 0,
      error: error instanceof Error ? error.message : "Failed to parse JSON",
    };
  }
};

/**
 * Download settings as a file
 */
export const downloadSettings = async (): Promise<void> => {
  const json = await exportSettings();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `thewcag-a11y-settings-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Trigger file picker and import settings
 */
export const pickAndImportSettings = (): Promise<{
  success: boolean;
  hostCount: number;
  error?: string;
}> => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve({ success: false, hostCount: 0, error: "No file selected" });
        return;
      }

      try {
        const json = await file.text();
        const result = await importSettings(json);
        resolve(result);
      } catch (error) {
        resolve({
          success: false,
          hostCount: 0,
          error: error instanceof Error ? error.message : "Failed to read file",
        });
      }
    };

    input.oncancel = () => {
      resolve({ success: false, hostCount: 0, error: "Cancelled" });
    };

    input.click();
  });
};
