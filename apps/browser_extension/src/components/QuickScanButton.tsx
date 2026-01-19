import React from "react";
import { IoScanOutline } from "react-icons/io5";
import { getApiKey, quickScan, type ScanResult } from "../api/thewcag";

interface QuickScanButtonProps {
  url: string | undefined;
  disabled?: boolean;
  onScanStart?: () => void;
  onScanComplete?: (result: ScanResult) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export const QuickScanButton: React.FC<QuickScanButtonProps> = ({
  url,
  disabled,
  onScanStart,
  onScanComplete,
  t,
}) => {
  const [isScanning, setIsScanning] = React.useState(false);
  const [hasApiKey, setHasApiKey] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    getApiKey().then((key) => setHasApiKey(!!key));
  }, []);

  const handleScan = async () => {
    if (!url) return;

    setIsScanning(true);
    onScanStart?.();

    try {
      const result = await quickScan(url);
      onScanComplete?.(result);
    } finally {
      setIsScanning(false);
    }
  };

  // Don't show if no API key is configured
  if (hasApiKey === null || !hasApiKey) {
    return null;
  }

  return (
    <button
      type="button"
      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg
        bg-coral-500 text-white hover:bg-coral-600
        dark:bg-coral-600 dark:hover:bg-coral-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors shadow-sm"
      onClick={handleScan}
      disabled={disabled || isScanning || !url}
    >
      <IoScanOutline className="size-4" />
      {isScanning ? t("popup.scanning") : t("popup.quickScan")}
    </button>
  );
};
