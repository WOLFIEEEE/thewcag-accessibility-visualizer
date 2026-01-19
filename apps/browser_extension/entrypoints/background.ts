import { browser, defineBackground } from "#imports";
import { DEFAULT_SETTING_KEY } from "../src/settings/constants";
import type { Settings } from "../src/settings/types";
import {
  applyPresetToSettings,
  SHORTCUT_COMMANDS,
  toggleLiveRegionsInSettings,
  toggleTipsInSettings,
} from "../src/shortcuts";

export default defineBackground({
  persistent: false,
  main: () => {
    const ENABLED_KEY = "__enabled__";

    const enabledIcons = {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "96": "icon/96.png",
      "128": "icon/128.png",
    } as const;

    const disabledIcons = {
      "16": "icon/disabled-16.png",
      "32": "icon/disabled-32.png",
      "48": "icon/disabled-48.png",
      "96": "icon/disabled-96.png",
      "128": "icon/disabled-128.png",
    } as const;

    const loadEnabled = async (): Promise<boolean> => {
      const result = await browser.storage.local.get(ENABLED_KEY);
      return result[ENABLED_KEY] ?? false;
    };

    const saveEnabled = async (enabled: boolean): Promise<void> => {
      await browser.storage.local.set({ [ENABLED_KEY]: enabled });
    };

    const updateIcons = async (enabled: boolean) => {
      try {
        const iconAPI = browser.action || browser.browserAction;
        if (enabled) {
          await iconAPI.setIcon({
            path: enabledIcons,
          });
        } else {
          await iconAPI.setIcon({
            path: disabledIcons,
          });
        }
      } catch (error) {
        console.error("Failed to update icon:", error);
      }
    };

    browser.runtime.onInstalled.addListener(async (details) => {
      const { reason } = details;
      if (reason === browser.runtime.OnInstalledReason.INSTALL) {
        saveEnabled(true);
      } else if (details.reason === browser.runtime.OnInstalledReason.UPDATE) {
        const enabled = await browser.storage.local.get(ENABLED_KEY);
        if (enabled[ENABLED_KEY] === undefined) {
          saveEnabled(true);
        }
      }
      const enabled = await loadEnabled();
      await updateIcons(enabled);
    });

    browser.runtime.onStartup.addListener(async () => {
      const enabled = await loadEnabled();
      await updateIcons(enabled);
    });

    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === "updateEnabled") {
        updateIcons(message.enabled).catch(console.error);
      }
      if (message.type === "isEnabled") {
        (async () => {
          const enabled = await loadEnabled();
          sendResponse({
            type: "isEnabledAnswer",
            enabled,
          });
        })();
        return true;
      }
    });

    // Load settings from storage
    const loadSettings = async (): Promise<Settings | null> => {
      const result = await browser.storage.sync.get(DEFAULT_SETTING_KEY);
      return result[DEFAULT_SETTING_KEY] ?? null;
    };

    // Save settings to storage
    const saveSettings = async (settings: Settings): Promise<void> => {
      await browser.storage.sync.set({ [DEFAULT_SETTING_KEY]: settings });
    };

    // Send settings update to active tab
    const sendSettingsToActiveTab = async (
      settings: Settings,
      enabled: boolean,
    ) => {
      try {
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tabs[0]?.id) {
          await browser.tabs.sendMessage(tabs[0].id, {
            type: "applySettings",
            settings,
            enabled,
          });
        }
      } catch {
        // Tab might not have content script loaded
      }
    };

    // Handle keyboard shortcut commands
    browser.commands.onCommand.addListener(async (command: string) => {
      const enabled = await loadEnabled();
      const settings = await loadSettings();

      if (!settings) {
        return;
      }

      switch (command) {
        case SHORTCUT_COMMANDS.toggleExtension: {
          const newEnabled = !enabled;
          await saveEnabled(newEnabled);
          await updateIcons(newEnabled);
          await sendSettingsToActiveTab(settings, newEnabled);
          break;
        }
        case SHORTCUT_COMMANDS.toggleTips: {
          const newSettings = toggleTipsInSettings(settings);
          await saveSettings(newSettings);
          await sendSettingsToActiveTab(newSettings, enabled);
          break;
        }
        case SHORTCUT_COMMANDS.toggleLiveRegions: {
          const newSettings = toggleLiveRegionsInSettings(settings);
          await saveSettings(newSettings);
          await sendSettingsToActiveTab(newSettings, enabled);
          break;
        }
        case SHORTCUT_COMMANDS.presetBasic: {
          const newSettings = applyPresetToSettings(settings, "basic");
          await saveSettings(newSettings);
          await sendSettingsToActiveTab(newSettings, enabled);
          break;
        }
      }
    });
  },
});
