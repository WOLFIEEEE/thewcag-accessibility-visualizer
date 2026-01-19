import type React from "react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  type CategorySettings,
  defaultCustomCategorySettings,
  type ElementTypeMode,
  getCategorySettingsFromMode,
  type PresetId,
  presets,
} from "../settings";
import {
  getInitialCustomSettings,
  loadCustomSettings,
  saveCustomSettings,
} from "../settings/storage";
import { useLang } from "../useLang";
import { Checkbox } from "./Checkbox";

const getEnabledSettingsLabels = (
  settings: CategorySettings,
  t: (key: string) => string,
): string[] => {
  const labels: string[] = [];
  if (settings.heading) labels.push(t("settings.headings"));
  if (settings.image) labels.push(t("settings.images"));
  if (settings.formControl) labels.push(t("settings.formControls"));
  if (settings.button) labels.push(t("settings.buttons"));
  if (settings.link) labels.push(t("settings.links"));
  if (settings.section) labels.push(t("settings.sections"));
  if (settings.page) labels.push(t("settings.page"));
  if (settings.lang) labels.push(t("settings.lang"));
  if (settings.table) labels.push(t("settings.tables"));
  if (settings.list) labels.push(t("settings.lists"));
  if (settings.waiAria) labels.push(t("settings.waiAria"));
  if (settings.tabIndex) labels.push(t("settings.tabIndex"));
  return labels;
};

interface ElementTypeTabsProps {
  elementTypeMode: ElementTypeMode;
  onChange: (elementTypeMode: ElementTypeMode) => void;
  disabled?: boolean;
  url?: string;
}

export const ElementTypeTabs: React.FC<ElementTypeTabsProps> = ({
  elementTypeMode,
  onChange,
  disabled = false,
  url,
}) => {
  const { t } = useLang();
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabPanelId = useId();
  const tabListId = useId();
  const customTabId = useId();

  // カスタム設定を独立して保持するstate
  const [customSettings, setCustomSettings] = useState<CategorySettings>(
    defaultCustomCategorySettings,
  );

  // カスタム設定の初期化
  useEffect(() => {
    const initializeCustomSettings = async () => {
      // ホスト固有のカスタム設定を読み込み
      const hostCustomSettings = await loadCustomSettings(url);

      if (hostCustomSettings) {
        // ホスト固有の設定が存在する場合
        setCustomSettings(hostCustomSettings);
      } else {
        // ホスト固有の設定がない場合、初期値を取得
        const initialSettings = await getInitialCustomSettings();
        setCustomSettings(initialSettings);
      }
    };

    initializeCustomSettings();
  }, [url]);

  // elementTypeModeが変更されたときにcustomSettingsを更新
  useEffect(() => {
    if (elementTypeMode.mode === "custom") {
      setCustomSettings(elementTypeMode.settings);
    }
  }, [elementTypeMode]);

  const currentCategorySettings = getCategorySettingsFromMode(
    elementTypeMode,
    defaultCustomCategorySettings,
  );
  const activeTab: PresetId =
    elementTypeMode.mode === "preset" ? elementTypeMode.presetId : "custom";

  const handlePresetChange = useCallback(
    (presetId: PresetId) => {
      if (presetId === "custom") {
        // カスタムモードに切り替え（保持しているカスタム設定を使用）
        onChange({
          mode: "custom",
          settings: customSettings,
        });
      } else {
        // プリセットモードに切り替え
        onChange({
          mode: "preset",
          presetId: presetId,
        });
      }
    },
    [customSettings, onChange],
  );

  const handleCheckboxChange = useCallback(
    (key: keyof CategorySettings, checked: boolean) => {
      // 新しいカスタム設定を作成
      const newCustomSettings = {
        ...customSettings,
        [key]: checked,
      };

      // カスタム設定を更新
      setCustomSettings(newCustomSettings);

      // ホスト固有のカスタム設定を保存
      saveCustomSettings(url, newCustomSettings);

      // チェックボックス変更は常にカスタムモード
      onChange({
        mode: "custom",
        settings: newCustomSettings,
      });
    },
    [customSettings, onChange, url],
  );

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const currentTarget = event.currentTarget;
      const tabList = tabListRef.current;
      if (!tabList) return;

      const tabs = Array.from(
        tabList.querySelectorAll('[role="tab"]'),
      ) as HTMLButtonElement[];
      const currentIndex = tabs.indexOf(currentTarget);

      // すべてのタブ（プリセット + カスタム）のIDリスト
      const allTabIds: PresetId[] = [...presets.map((p) => p.id), "custom"];

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp": {
          event.preventDefault();
          const prevIndex =
            currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
          tabs[prevIndex]?.focus();
          const prevTabId = allTabIds[prevIndex];
          if (prevTabId) {
            handlePresetChange(prevTabId);
          }
          break;
        }
        case "ArrowRight":
        case "ArrowDown": {
          event.preventDefault();
          const nextIndex =
            currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
          tabs[nextIndex]?.focus();
          const nextTabId = allTabIds[nextIndex];
          if (nextTabId) {
            handlePresetChange(nextTabId);
          }
          break;
        }
        case "Home":
          event.preventDefault();
          tabs[0]?.focus();
          handlePresetChange(allTabIds[0]);
          break;
        case "End":
          event.preventDefault();
          tabs[tabs.length - 1]?.focus();
          handlePresetChange(allTabIds[allTabIds.length - 1]);
          break;
      }
    },
    [disabled, handlePresetChange],
  );

  return (
    <div className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
      <fieldset className="border-0 flex flex-col">
        <legend
          className={`text-xs ${disabled ? "text-stone-500 dark:text-stone-400" : "text-coral-600 dark:text-coral-400"} font-bold`}
          id={tabListId}
        >
          {t("settings.elementTypes")}
        </legend>

        {/* タブリスト */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-labelledby={tabListId}
          aria-orientation="horizontal"
          className="flex flex-row mb-2 border-b border-stone-300 dark:border-stone-600 px-1 -mx-1"
        >
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              role="tab"
              id={`tab-${preset.id}`}
              aria-selected={activeTab === preset.id}
              aria-controls={`${tabPanelId}-panel`}
              tabIndex={activeTab === preset.id ? 0 : -1}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 border-b-2 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-inset
                relative before-content-[''] before:absolute before:-top-3 before:bottom-0 before:left-0 before:right-0 before:z-10
                ${
                  activeTab === preset.id
                    ? "border-coral-500 text-coral-600 dark:text-coral-400"
                    : "border-transparent text-stone-600 hover:enabled:text-stone-800 hover:enabled:border-stone-400 dark:text-stone-400 dark:hover:enabled:text-stone-200 dark:hover:enabled:border-stone-500"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handlePresetChange(preset.id)}
              onKeyDown={handleTabKeyDown}
              disabled={disabled}
            >
              {t(preset.labelKey)}
            </button>
          ))}
          <button
            key="custom"
            type="button"
            role="tab"
            id={customTabId}
            aria-selected={activeTab === "custom"}
            aria-controls={`${tabPanelId}-panel`}
            tabIndex={activeTab === "custom" ? 0 : -1}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-inset border-b-2 ${
              activeTab === "custom"
                ? "border-coral-500 text-coral-600 dark:text-coral-400"
                : "border-transparent text-stone-600 hover:enabled:text-stone-800 hover:enabled:border-stone-400 dark:text-stone-400 dark:hover:enabled:text-stone-200 dark:hover:enabled:border-stone-500"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handlePresetChange("custom")}
            onKeyDown={handleTabKeyDown}
            disabled={disabled}
          >
            {t("presets.custom")}
          </button>
        </div>

        {/* タブパネル */}
        <div
          role="tabpanel"
          id={`${tabPanelId}-panel`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {/* カスタムタブの場合のみチェックボックスを表示 */}
          {activeTab === "custom" ? (
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-2 py-1 items-center">
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("heading", e.target.checked)
                }
                checked={currentCategorySettings.heading}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.headings")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("image", e.target.checked)
                }
                checked={currentCategorySettings.image}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.images")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("formControl", e.target.checked)
                }
                checked={currentCategorySettings.formControl}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.formControls")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("button", e.target.checked)
                }
                checked={currentCategorySettings.button}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.buttons")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckboxChange("link", e.target.checked)}
                checked={currentCategorySettings.link}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.links")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("section", e.target.checked)
                }
                checked={currentCategorySettings.section}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.sections")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckboxChange("page", e.target.checked)}
                checked={currentCategorySettings.page}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.page")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckboxChange("lang", e.target.checked)}
                checked={currentCategorySettings.lang}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.lang")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("table", e.target.checked)
                }
                checked={currentCategorySettings.table}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.tables")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckboxChange("list", e.target.checked)}
                checked={currentCategorySettings.list}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.lists")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("waiAria", e.target.checked)
                }
                checked={currentCategorySettings.waiAria}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.waiAria")}</span>
              </Checkbox>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange("tabIndex", e.target.checked)
                }
                checked={currentCategorySettings.tabIndex}
                disabled={disabled}
              >
                <span className="text-sm">{t("settings.tabIndex")}</span>
              </Checkbox>
              <div className="grow flex flex-row justify-end">
                <button
                  type="button"
                  className="text-coral-600 bg-opacity-0 rounded-full shrink-0 px-2 py-1 text-xs underline
                      dark:text-coral-400
                      hover:enabled:bg-stone-200 transition-colors cursor-pointer
                      dark:hover:enabled:bg-coral-900/30
                      disabled:text-stone-400 disabled:cursor-not-allowed"
                  onClick={() => {
                    // すべてのチェックボックスを外す
                    const allUnchecked = Object.keys(customSettings).reduce(
                      (acc, key) => {
                        acc[key as keyof CategorySettings] = false;
                        return acc;
                      },
                      {} as CategorySettings,
                    );

                    setCustomSettings(allUnchecked);
                    saveCustomSettings(url, allUnchecked);

                    onChange({
                      mode: "custom",
                      settings: allUnchecked,
                    });
                  }}
                  disabled={disabled}
                >
                  {t("settings.uncheckAll")}
                </button>
              </div>
            </div>
          ) : (
            <div className="px-2 py-1">
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-1 items-center">
                {getEnabledSettingsLabels(currentCategorySettings, t).map(
                  (label) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-coral-50 text-coral-700 dark:bg-coral-900/30 dark:text-coral-300 border dark:border-0 border-coral-300"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};
