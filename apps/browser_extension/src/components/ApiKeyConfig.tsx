import React from "react";
import { IoCheckmark, IoEye, IoEyeOff, IoKey, IoTrash } from "react-icons/io5";
import {
  getApiKey,
  removeApiKey,
  setApiKey,
  validateApiKey,
} from "../api/thewcag";

interface ApiKeyConfigProps {
  t: (key: string, options?: Record<string, unknown>) => string;
}

export const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ t }) => {
  const [apiKey, setApiKeyState] = React.useState<string>("");
  const [hasExistingKey, setHasExistingKey] = React.useState(false);
  const [showKey, setShowKey] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationStatus, setValidationStatus] = React.useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [saveStatus, setSaveStatus] = React.useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  React.useEffect(() => {
    getApiKey().then((key) => {
      if (key) {
        setHasExistingKey(true);
        // Show masked key
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
      // User is typing a new key
      setHasExistingKey(false);
    }
    setApiKeyState(value);
    setValidationStatus("idle");
    setSaveStatus("idle");
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
        <IoKey className="size-4" />
        {t("optionsPage.apiKeyConfig")}
      </h3>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {t("optionsPage.apiKeyDescription")}
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showKey && !apiKey.startsWith("•") ? "text" : "password"}
            value={apiKey}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder={t("optionsPage.apiKeyPlaceholder")}
            className="w-full px-3 py-2 pr-10 text-sm border border-zinc-300 dark:border-zinc-600
              rounded-md bg-white dark:bg-zinc-800
              text-zinc-800 dark:text-zinc-200
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {showKey ? (
              <IoEyeOff className="size-5" />
            ) : (
              <IoEye className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleValidate}
          disabled={!apiKey || apiKey.startsWith("•") || isValidating}
          className="px-3 py-1.5 text-xs rounded-md
            border border-zinc-300 dark:border-zinc-600
            text-zinc-700 dark:text-zinc-300
            hover:bg-zinc-100 dark:hover:bg-zinc-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors"
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
          className="px-3 py-1.5 text-xs rounded-md
            bg-teal-600 text-white hover:bg-teal-700
            dark:bg-teal-700 dark:hover:bg-teal-600
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors flex items-center gap-1"
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
            className="px-3 py-1.5 text-xs rounded-md
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              transition-colors flex items-center gap-1"
          >
            <IoTrash className="size-4" />
            {t("optionsPage.removeKey")}
          </button>
        )}
      </div>

      {validationStatus === "valid" && (
        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <IoCheckmark className="size-4" />
          {t("optionsPage.keyValid")}
        </p>
      )}

      {validationStatus === "invalid" && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {t("optionsPage.keyInvalid")}
        </p>
      )}

      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        {t("optionsPage.getApiKey")}{" "}
        <a
          href="https://thewcag.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 dark:text-teal-400 hover:underline"
        >
          thewcag.com
        </a>
      </p>
    </div>
  );
};
