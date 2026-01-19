import { defineConfig } from "wxt";
import pkg from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: false,
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  // Use Manifest V3 for Firefox as well
  // manifestVersion: 3,
  vite: () => ({
    css: {
      postcss: "./postcss.config.js",
    },
    test: {
      browser: {
        enabled: true,
        provider: "playwright",
        headless: true,
        instances: [
          {
            name: "chromium",
            browser: "chromium",
          },
          {
            name: "firefox",
            browser: "firefox",
          },
        ],
      },
    },
  }),
  manifest: {
    name: "TheWCAG Accessibility Visualizer",
    version: pkg.version,
    default_locale: "en",
    permissions: ["storage", "activeTab"],
    action: {
      default_icon: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "96": "icon/96.png",
        "128": "icon/128.png",
        "192": "icon/192.png",
      },
    },
    browser_action: {
      default_icon: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "96": "icon/96.png",
        "128": "icon/128.png",
        "192": "icon/192.png",
      },
      default_title: "TheWCAG Accessibility Visualizer",
      default_popup: "popup.html",
    },
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "96": "icon/96.png",
      "128": "icon/128.png",
      "192": "icon/192.png",
    },
    options_ui: {
      page: "options.html",
      open_in_tab: true,
    },
    commands: {
      "toggle-extension": {
        suggested_key: {
          default: "Alt+Shift+V",
          mac: "Alt+Shift+V",
        },
        description: "__MSG_shortcut_toggleExtension__",
      },
      "toggle-tips": {
        suggested_key: {
          default: "Alt+Shift+T",
          mac: "Alt+Shift+T",
        },
        description: "__MSG_shortcut_toggleTips__",
      },
      "toggle-live-regions": {
        suggested_key: {
          default: "Alt+Shift+L",
          mac: "Alt+Shift+L",
        },
        description: "__MSG_shortcut_toggleLiveRegions__",
      },
      "preset-basic": {
        suggested_key: {
          default: "Alt+Shift+1",
          mac: "Alt+Shift+1",
        },
        description: "__MSG_shortcut_presetBasic__",
      },
    },
    minimum_chrome_version: "89",
    browser_specific_settings: {
      gecko: {
        id: "thewcag-a11y-visualizer@thewcag.com",
      },
      gecko_android: {
        strict_min_version: "113.0",
      },
    },
  },
  zip: {
    artifactTemplate: "thewcag-a11y-visualizer-{{version}}-{{browser}}.zip",
  },
});
