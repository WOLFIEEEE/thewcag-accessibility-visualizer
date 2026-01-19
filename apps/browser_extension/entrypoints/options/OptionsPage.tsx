import React, { type ChangeEvent, useId, useState } from "react";
import {
  IoCheckmark,
  IoCloudDownloadOutline,
  IoCloudUploadOutline,
  IoColorPaletteOutline,
  IoDownloadOutline,
  IoEye,
  IoEyeOff,
  IoEyeOutline,
  IoGridOutline,
  IoKeyOutline,
  IoRefreshOutline,
  IoSettingsOutline,
  IoTrash,
} from "react-icons/io5";
import "../popup/index.css";
import {
  getApiKey,
  removeApiKey,
  setApiKey,
  validateApiKey,
} from "../../src/api/thewcag";
import icon from "../../src/assets/icon.png";
import {
  type CategorySettings,
  type DisplayMode,
  defaultCustomCategorySettings,
  downloadSettings,
  type ElementTypeMode,
  getCategorySettingsFromMode,
  initialSettings,
  loadDefaultSettings,
  type PresetId,
  pickAndImportSettings,
  presets,
  resetDefaultSettings,
  type Settings,
  saveDefaultSettings,
} from "../../src/settings";
import type { SupportedLanguage } from "../../src/settings/types";
import { useLang } from "../../src/useLang";

type SectionId =
  | "general"
  | "display"
  | "elements"
  | "appearance"
  | "api"
  | "data";

export const OptionsPage = () => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [activeSection, setActiveSection] = useState<SectionId>("general");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, updateLanguage } = useLang();

  const getSettings = React.useCallback(async () => {
    const [newSettings] = await loadDefaultSettings();
    setSettings(newSettings);
  }, []);

  React.useEffect(() => {
    getSettings();
  }, [getSettings]);

  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    saveDefaultSettings(newSettings);
  };

  const handleLanguageChange = async (newLang: SupportedLanguage) => {
    const newSettings = { ...settings, language: newLang };
    await updateSettings(newSettings);
    updateLanguage(newLang);
  };

  const handleNavClick = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    {
      id: "general" as SectionId,
      labelKey: "settings.sections.general",
      icon: <IoSettingsOutline className="size-5" />,
    },
    {
      id: "display" as SectionId,
      labelKey: "settings.sections.display",
      icon: <IoEyeOutline className="size-5" />,
    },
    {
      id: "elements" as SectionId,
      labelKey: "settings.sections.elements",
      icon: <IoGridOutline className="size-5" />,
    },
    {
      id: "appearance" as SectionId,
      labelKey: "settings.sections.appearance",
      icon: <IoColorPaletteOutline className="size-5" />,
    },
    {
      id: "api" as SectionId,
      labelKey: "settings.sections.api",
      icon: <IoKeyOutline className="size-5" />,
    },
    {
      id: "data" as SectionId,
      labelKey: "settings.sections.data",
      icon: <IoCloudDownloadOutline className="size-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]" lang={lang}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border-color)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src={icon}
                alt=""
                className="size-8"
                width="32"
                height="32"
              />
              <h1 className="text-lg font-semibold text-[var(--text-primary)]">
                {t("popup.title")}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="px-3 py-1.5 text-sm rounded-lg border border-stone-300 dark:border-stone-600 
                  bg-[var(--bg-surface)] text-[var(--text-primary)] 
                  focus:outline-none focus:ring-2 focus:ring-coral-500"
                value={settings.language}
                onChange={(e) =>
                  handleLanguageChange(e.target.value as SupportedLanguage)
                }
              >
                <option value="auto">{t("languages.auto")}</option>
                <option value="en">{t("languages.en")}</option>
                <option value="ja">{t("languages.ja")}</option>
                <option value="ko">{t("languages.ko")}</option>
              </select>
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-[var(--border-color)] bg-[var(--bg-surface)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    activeSection === item.id
                      ? "bg-coral-50 dark:bg-coral-950/30 text-coral-600 dark:text-coral-400"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
              >
                {item.icon}
                <span>{t(item.labelKey)}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[var(--bg-page)]">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      activeSection === item.id
                        ? "bg-coral-50 dark:bg-coral-950/30 text-coral-600 dark:text-coral-400"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                    }`}
                >
                  {item.icon}
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* General Section */}
            <SettingsSection
              id="general"
              title={t("settings.sections.general")}
              description={t("settings.sectionsDesc.general")}
              icon={<IoSettingsOutline className="size-6" />}
            >
              <SettingsRow label={t("optionsPage.displayLanguage")}>
                <select
                  className="px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-600 
                    bg-[var(--bg-surface)] text-[var(--text-primary)]
                    focus:outline-none focus:ring-2 focus:ring-coral-500 min-w-32"
                  value={settings.language}
                  onChange={(e) =>
                    handleLanguageChange(e.target.value as SupportedLanguage)
                  }
                >
                  <option value="auto">{t("languages.auto")}</option>
                  <option value="en">{t("languages.en")}</option>
                  <option value="ja">{t("languages.ja")}</option>
                  <option value="ko">{t("languages.ko")}</option>
                </select>
              </SettingsRow>
            </SettingsSection>

            {/* Display Section */}
            <SettingsSection
              id="display"
              title={t("settings.sections.display")}
              description={t("settings.sectionsDesc.display")}
              icon={<IoEyeOutline className="size-6" />}
            >
              <ToggleRow
                label={t("settings.showTips")}
                checked={settings.accessibilityInfo}
                onChange={(checked) =>
                  updateSettings({ ...settings, accessibilityInfo: checked })
                }
              />
              <ToggleRow
                label={t("settings.interactive")}
                checked={settings.interactiveMode}
                onChange={(checked) =>
                  updateSettings({ ...settings, interactiveMode: checked })
                }
                disabled={!settings.accessibilityInfo}
              />
              <ToggleRow
                label={t("settings.announceLiveRegions")}
                checked={settings.showLiveRegions}
                onChange={(checked) =>
                  updateSettings({ ...settings, showLiveRegions: checked })
                }
              />
              <ToggleRow
                label={t("summary.showPanel")}
                checked={settings.showSummaryPanel}
                onChange={(checked) =>
                  updateSettings({ ...settings, showSummaryPanel: checked })
                }
              />
              <SettingsRow label={t("settings.displayMode")}>
                <select
                  className="px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-600 
                    bg-[var(--bg-surface)] text-[var(--text-primary)]
                    focus:outline-none focus:ring-2 focus:ring-coral-500 min-w-40"
                  value={settings.displayMode}
                  onChange={(e) =>
                    updateSettings({
                      ...settings,
                      displayMode: e.target.value as DisplayMode,
                    })
                  }
                  disabled={!settings.accessibilityInfo}
                >
                  <option value="both">{t("settings.displayModeBoth")}</option>
                  <option value="highlights">
                    {t("settings.displayModeHighlights")}
                  </option>
                  <option value="tips">{t("settings.displayModeTips")}</option>
                </select>
              </SettingsRow>
            </SettingsSection>

            {/* Elements Section */}
            <SettingsSection
              id="elements"
              title={t("settings.sections.elements")}
              description={t("settings.sectionsDesc.elements")}
              icon={<IoGridOutline className="size-6" />}
            >
              <ElementTypesEditor
                settings={settings}
                onChange={updateSettings}
                t={t}
              />
            </SettingsSection>

            {/* Appearance Section */}
            <SettingsSection
              id="appearance"
              title={t("settings.sections.appearance")}
              description={t("settings.sectionsDesc.appearance")}
              icon={<IoColorPaletteOutline className="size-6" />}
            >
              <AppearanceSettings
                settings={settings}
                onChange={updateSettings}
                t={t}
              />
            </SettingsSection>

            {/* API Section */}
            <SettingsSection
              id="api"
              title={t("settings.sections.api")}
              description={t("settings.sectionsDesc.api")}
              icon={<IoKeyOutline className="size-6" />}
            >
              <ApiKeySection t={t} />
            </SettingsSection>

            {/* Data Section */}
            <SettingsSection
              id="data"
              title={t("settings.sections.data")}
              description={t("settings.sectionsDesc.data")}
              icon={<IoCloudDownloadOutline className="size-6" />}
            >
              <DataManagementSection
                settings={settings}
                setSettings={setSettings}
                getSettings={getSettings}
                t={t}
              />
            </SettingsSection>
          </div>
        </main>
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection: React.FC<{
  id: SectionId;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, title, description, icon, children }) => (
  <section
    id={`section-${id}`}
    className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-sm p-6 scroll-mt-24"
  >
    <div className="flex items-start gap-4 mb-6">
      {icon && (
        <div className="p-2 rounded-lg bg-coral-50 dark:bg-coral-950/30 text-coral-500 dark:text-coral-400">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="space-y-1">{children}</div>
  </section>
);

// Settings Row Component
const SettingsRow: React.FC<{
  label: string;
  description?: string;
  children: React.ReactNode;
}> = ({ label, description, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-[var(--border-color)] last:border-0">
    <div className="flex-1">
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {label}
      </span>
      {description && (
        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

// Toggle Row Component
const ToggleRow: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ label, description, checked, onChange, disabled }) => {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-3 py-4 border-b border-[var(--border-color)] last:border-0">
      <div className="flex-1">
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--text-primary)] cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2
          ${checked ? "bg-coral-500" : "bg-stone-300 dark:bg-stone-600"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200
            ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};

// Element Types Editor
const ElementTypesEditor: React.FC<{
  settings: Settings;
  onChange: (settings: Settings) => void;
  t: (key: string) => string;
}> = ({ settings, onChange, t }) => {
  const activeTab: PresetId =
    settings.elementTypeMode.mode === "preset"
      ? settings.elementTypeMode.presetId
      : "custom";

  const currentCategorySettings = getCategorySettingsFromMode(
    settings.elementTypeMode,
    defaultCustomCategorySettings,
  );

  const handlePresetChange = (presetId: PresetId) => {
    if (presetId === "custom") {
      onChange({
        ...settings,
        elementTypeMode: { mode: "custom", settings: currentCategorySettings },
      });
    } else {
      onChange({
        ...settings,
        elementTypeMode: { mode: "preset", presetId },
      });
    }
  };

  const handleCheckboxChange = (
    key: keyof CategorySettings,
    checked: boolean,
  ) => {
    const newSettings = { ...currentCategorySettings, [key]: checked };
    onChange({
      ...settings,
      elementTypeMode: { mode: "custom", settings: newSettings },
    });
  };

  const categories: { key: keyof CategorySettings; labelKey: string }[] = [
    { key: "heading", labelKey: "settings.headings" },
    { key: "image", labelKey: "settings.images" },
    { key: "formControl", labelKey: "settings.formControls" },
    { key: "button", labelKey: "settings.buttons" },
    { key: "link", labelKey: "settings.links" },
    { key: "section", labelKey: "tip.landmark" },
    { key: "page", labelKey: "settings.page" },
    { key: "lang", labelKey: "settings.lang" },
    { key: "table", labelKey: "settings.tables" },
    { key: "list", labelKey: "settings.lists" },
    { key: "waiAria", labelKey: "settings.waiAria" },
    { key: "tabIndex", labelKey: "settings.tabIndex" },
  ];

  return (
    <div className="space-y-4">
      {/* Preset Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--border-color)]">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetChange(preset.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
              ${
                activeTab === preset.id
                  ? "bg-coral-500 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-[var(--text-secondary)] hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
          >
            {t(preset.labelKey)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handlePresetChange("custom")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
            ${
              activeTab === "custom"
                ? "bg-coral-500 text-white shadow-sm"
                : "bg-stone-100 dark:bg-stone-800 text-[var(--text-secondary)] hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
        >
          {t("presets.custom")}
        </button>
      </div>

      {/* Element Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map(({ key, labelKey }) => (
          <label
            key={key}
            className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer
              ${
                currentCategorySettings[key]
                  ? "bg-coral-50 dark:bg-coral-950/20 border-coral-300 dark:border-coral-800"
                  : "bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-stone-400 dark:hover:border-stone-500"
              }`}
          >
            <input
              type="checkbox"
              checked={currentCategorySettings[key]}
              onChange={(e) => handleCheckboxChange(key, e.target.checked)}
              className="size-4 rounded border-stone-300 text-coral-500 focus:ring-coral-500"
            />
            <span className="text-sm text-[var(--text-primary)]">
              {t(labelKey)}
            </span>
          </label>
        ))}
      </div>

      <ToggleRow
        label={t("settings.hideOutOfSightElementTips")}
        checked={settings.hideOutOfSightElementTips}
        onChange={(checked) =>
          onChange({ ...settings, hideOutOfSightElementTips: checked })
        }
      />
    </div>
  );
};

// Appearance Settings
const AppearanceSettings: React.FC<{
  settings: Settings;
  onChange: (settings: Settings) => void;
  t: (key: string) => string;
}> = ({ settings, onChange, t }) => {
  const handleChange = (key: keyof Settings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <ToggleRow
        label={t("settings.interactiveModeHideLabels")}
        checked={settings.hideTips}
        onChange={(checked) => onChange({ ...settings, hideTips: checked })}
        disabled={!settings.accessibilityInfo || !settings.interactiveMode}
      />

      {/* Tip Settings */}
      <div className="space-y-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">Tips</h3>

        <SliderRow
          label={t("settings.tipOpacityPercent")}
          value={settings.tipOpacityPercent}
          onChange={(v) => handleChange("tipOpacityPercent", v)}
          min={0}
          max={100}
          unit="%"
          disabled={!settings.accessibilityInfo}
        />

        <SliderRow
          label={t("settings.activeTipOpacityPercent")}
          value={settings.activeTipOpacityPercent}
          onChange={(v) => handleChange("activeTipOpacityPercent", v)}
          min={0}
          max={100}
          unit="%"
          disabled={!settings.accessibilityInfo}
        />

        <NumberRow
          label={t("settings.tipFontSize")}
          value={settings.tipFontSize}
          onChange={(v) => handleChange("tipFontSize", v)}
          min={8}
          unit="px"
          disabled={!settings.accessibilityInfo}
        />
      </div>

      {/* Live Region Settings */}
      <div className="space-y-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          {t("settings.liveRegionDisplay")}
        </h3>

        <SliderRow
          label={t("settings.liveRegionOpacityPercent")}
          value={settings.liveRegionOpacityPercent}
          onChange={(v) => handleChange("liveRegionOpacityPercent", v)}
          min={0}
          max={100}
          unit="%"
          disabled={!settings.showLiveRegions}
        />

        <NumberRow
          label={t("settings.liveRegionFontSize")}
          value={settings.liveRegionFontSize}
          onChange={(v) => handleChange("liveRegionFontSize", v)}
          min={8}
          unit="px"
          disabled={!settings.showLiveRegions}
        />

        <NumberRow
          label={t("settings.announcementMaxSeconds")}
          value={settings.announcementMaxSeconds}
          onChange={(v) => handleChange("announcementMaxSeconds", v)}
          min={1}
          unit="s"
          disabled={!settings.showLiveRegions}
        />

        <NumberRow
          label={t("settings.announcementSecondsPerCharacter")}
          value={settings.announcementSecondsPerCharacter}
          onChange={(v) => handleChange("announcementSecondsPerCharacter", v)}
          min={0.1}
          step={0.1}
          unit="s"
          disabled={!settings.showLiveRegions}
        />
      </div>
    </div>
  );
};

// Slider Row Component
const SliderRow: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
  disabled?: boolean;
}> = ({ label, value, onChange, min, max, unit, disabled }) => {
  const id = useId();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm text-[var(--text-secondary)]">
          {label}
        </label>
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-coral-500 disabled:opacity-50"
      />
    </div>
  );
};

// Number Row Component
const NumberRow: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}> = ({ label, value, onChange, min, step = 1, unit, disabled }) => {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm text-[var(--text-secondary)]">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="w-20 px-3 py-1.5 text-sm text-right rounded-lg border border-stone-300 dark:border-stone-600 
            bg-[var(--bg-surface)] text-[var(--text-primary)]
            focus:outline-none focus:ring-2 focus:ring-coral-500 disabled:opacity-50"
        />
        {unit && (
          <span className="text-sm text-[var(--text-muted)]">{unit}</span>
        )}
      </div>
    </div>
  );
};

// API Key Section
const ApiKeySection: React.FC<{
  t: (key: string, options?: Record<string, unknown>) => string;
}> = ({ t }) => {
  const [apiKey, setApiKeyState] = useState("");
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  React.useEffect(() => {
    getApiKey().then((key) => {
      if (key) {
        setHasExistingKey(true);
        setApiKeyState("•".repeat(32));
      }
    });
  }, []);

  const handleValidate = async () => {
    if (!apiKey || apiKey.startsWith("•")) return;
    setIsValidating(true);
    setValidationStatus("idle");
    try {
      const isValid = await validateApiKey(apiKey);
      setValidationStatus(isValid ? "valid" : "invalid");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey || apiKey.startsWith("•")) return;
    setSaveStatus("saving");
    try {
      await setApiKey(apiKey);
      setHasExistingKey(true);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleRemove = async () => {
    await removeApiKey();
    setApiKeyState("");
    setHasExistingKey(false);
    setValidationStatus("idle");
  };

  const handleKeyChange = (value: string) => {
    if (hasExistingKey && value !== apiKey) {
      setHasExistingKey(false);
    }
    setApiKeyState(value);
    setValidationStatus("idle");
    setSaveStatus("idle");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--text-secondary)]">
        {t("optionsPage.apiKeyDescription")}
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showKey && !apiKey.startsWith("•") ? "text" : "password"}
            value={apiKey}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder={t("optionsPage.apiKeyPlaceholder")}
            className="w-full px-4 py-3 pr-12 text-sm rounded-lg border border-stone-300 dark:border-stone-600 
              bg-[var(--bg-surface)] text-[var(--text-primary)]
              placeholder:text-[var(--text-muted)]
              focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          >
            {showKey ? (
              <IoEyeOff className="size-5" />
            ) : (
              <IoEye className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleValidate}
          disabled={!apiKey || apiKey.startsWith("•") || isValidating}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-stone-300 dark:border-stone-600 
            text-[var(--text-secondary)] hover:bg-stone-100 dark:hover:bg-stone-800
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isValidating
            ? t("optionsPage.validating")
            : t("optionsPage.validateKey")}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={
            !apiKey ||
            apiKey.startsWith("•") ||
            validationStatus !== "valid" ||
            saveStatus === "saving"
          }
          className="px-4 py-2 text-sm font-medium rounded-lg bg-coral-500 text-white hover:bg-coral-600
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {saveStatus === "saving" ? (
            t("optionsPage.saving")
          ) : saveStatus === "saved" ? (
            <>
              <IoCheckmark className="size-4" />
              {t("optionsPage.saved")}
            </>
          ) : (
            t("optionsPage.saveKey")
          )}
        </button>

        {hasExistingKey && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 
              hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
          >
            <IoTrash className="size-4" />
            {t("optionsPage.removeKey")}
          </button>
        )}
      </div>

      {validationStatus === "valid" && (
        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
          <IoCheckmark className="size-4" />
          {t("optionsPage.keyValid")}
        </p>
      )}

      {validationStatus === "invalid" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t("optionsPage.keyInvalid")}
        </p>
      )}

      <p className="text-xs text-[var(--text-muted)]">
        {t("optionsPage.getApiKey")}{" "}
        <a
          href="https://thewcag.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-500 hover:underline"
        >
          thewcag.com
        </a>
      </p>
    </div>
  );
};

// Data Management Section
const DataManagementSection: React.FC<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  getSettings: () => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
}> = ({ settings, setSettings, getSettings, t }) => {
  const [resetDone, setResetDone] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleReset = async () => {
    await resetDefaultSettings();
    setSettings(initialSettings);
    setResetDone(true);
    setShowResetConfirm(false);
    setTimeout(() => setResetDone(false), 3000);
  };

  const handleImport = async () => {
    setImportStatus({ type: null, message: "" });
    const result = await pickAndImportSettings();
    if (result.success) {
      await getSettings();
      setImportStatus({
        type: "success",
        message: t("optionsPage.importSuccess", { count: result.hostCount }),
      });
    } else if (result.error !== "Cancelled") {
      setImportStatus({
        type: "error",
        message: result.error || t("optionsPage.importError"),
      });
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--text-secondary)]">
        {t("optionsPage.description")}
      </p>

      {/* Export/Import */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadSettings()}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-coral-500 text-white hover:bg-coral-600
            transition-colors flex items-center gap-2"
        >
          <IoDownloadOutline className="size-4" />
          {t("optionsPage.exportSettings")}
        </button>

        <button
          type="button"
          onClick={handleImport}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-coral-500 text-coral-600 dark:text-coral-400
            hover:bg-coral-50 dark:hover:bg-coral-900/20 transition-colors flex items-center gap-2"
        >
          <IoCloudUploadOutline className="size-4" />
          {t("optionsPage.importSettings")}
        </button>
      </div>

      {importStatus.type && (
        <p
          className={`text-sm ${
            importStatus.type === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {importStatus.message}
        </p>
      )}

      {/* Reset */}
      <div className="pt-4 border-t border-[var(--border-color)]">
        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 
              border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20
              transition-colors flex items-center gap-2"
          >
            <IoRefreshOutline className="size-4" />
            {t("optionsPage.resetSettings")}
          </button>
        ) : (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg space-y-3">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t("optionsPage.resetSettingsConfirm")}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                {t("optionsPage.resetSettingsConfirmYes")}
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-stone-300 dark:border-stone-600 
                  text-[var(--text-secondary)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t("optionsPage.resetSettingsConfirmNo")}
              </button>
            </div>
          </div>
        )}

        {resetDone && (
          <p className="mt-3 text-sm text-green-600 dark:text-green-400">
            {t("optionsPage.resetSettingsSuccess")}
          </p>
        )}
      </div>
    </div>
  );
};
