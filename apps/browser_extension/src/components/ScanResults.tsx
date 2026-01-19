import React from "react";
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoChevronDown,
  IoChevronUp,
  IoClose,
  IoWarning,
} from "react-icons/io5";
import type { ScanResult } from "../api/thewcag";

interface ScanResultsProps {
  result: ScanResult | null;
  onClose: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const SeverityBadge: React.FC<{ severity: string; count: number }> = ({
  severity,
  count,
}) => {
  const colors: Record<string, string> = {
    critical: "bg-red-600 text-white",
    serious: "bg-orange-500 text-white",
    moderate: "bg-yellow-500 text-black",
    minor: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`px-1.5 py-0.5 rounded text-xs font-medium ${colors[severity] || "bg-gray-500 text-white"}`}
    >
      {severity}: {count}
    </span>
  );
};

export const ScanResults: React.FC<ScanResultsProps> = ({
  result,
  onClose,
  t,
}) => {
  const [expandedViolation, setExpandedViolation] = React.useState<
    string | null
  >(null);

  if (!result) return null;

  if (!result.success) {
    return (
      <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <IoAlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {t("popup.scanError")}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                {result.error}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
            type="button"
          >
            <IoClose className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  const { data } = result;
  if (!data) return null;

  return (
    <div className="mt-2 p-3 bg-stone-100 dark:bg-stone-800 rounded-lg">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <IoCheckmarkCircle className="size-5 text-green-600 dark:text-green-400 shrink-0" />
          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
            {t("popup.scanComplete")}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
          type="button"
        >
          <IoClose className="size-4" />
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400">
            {t("popup.violations")}
          </p>
          <p className="text-lg font-bold text-red-700 dark:text-red-300">
            {data.summary.totalViolations}
          </p>
        </div>
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs text-green-600 dark:text-green-400">
            {t("popup.passes")}
          </p>
          <p className="text-lg font-bold text-green-700 dark:text-green-300">
            {data.summary.totalPasses}
          </p>
        </div>
      </div>

      {/* Severity breakdown */}
      {data.summary.totalViolations > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {data.summary.violationsBySeverity.critical > 0 && (
            <SeverityBadge
              severity="critical"
              count={data.summary.violationsBySeverity.critical}
            />
          )}
          {data.summary.violationsBySeverity.serious > 0 && (
            <SeverityBadge
              severity="serious"
              count={data.summary.violationsBySeverity.serious}
            />
          )}
          {data.summary.violationsBySeverity.moderate > 0 && (
            <SeverityBadge
              severity="moderate"
              count={data.summary.violationsBySeverity.moderate}
            />
          )}
          {data.summary.violationsBySeverity.minor > 0 && (
            <SeverityBadge
              severity="minor"
              count={data.summary.violationsBySeverity.minor}
            />
          )}
        </div>
      )}

      {/* Violations list */}
      {data.violations.length > 0 && (
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {data.violations.slice(0, 5).map((violation) => (
            <div
              key={violation.id}
              className="bg-white dark:bg-stone-700 rounded-lg p-2 text-xs"
            >
              <button
                type="button"
                className="w-full flex items-start justify-between gap-2 text-left"
                onClick={() =>
                  setExpandedViolation(
                    expandedViolation === violation.id ? null : violation.id,
                  )
                }
              >
                <div className="flex items-start gap-1.5">
                  <IoWarning
                    className={`size-3.5 shrink-0 mt-0.5 ${
                      violation.impact === "critical"
                        ? "text-red-500"
                        : violation.impact === "serious"
                          ? "text-coral-500"
                          : "text-yellow-500"
                    }`}
                  />
                  <span className="text-stone-700 dark:text-stone-200">
                    {violation.help}
                  </span>
                </div>
                {expandedViolation === violation.id ? (
                  <IoChevronUp className="size-3.5 shrink-0 text-stone-400" />
                ) : (
                  <IoChevronDown className="size-3.5 shrink-0 text-stone-400" />
                )}
              </button>
              {expandedViolation === violation.id && (
                <div className="mt-2 pl-5 space-y-1 text-stone-600 dark:text-stone-300">
                  <p>{violation.description}</p>
                  <p className="text-stone-500 dark:text-stone-400">
                    {violation.nodes.length} element(s) affected
                  </p>
                  {violation.helpUrl && (
                    <a
                      href={violation.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral-600 dark:text-coral-400 hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
          {data.violations.length > 5 && (
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center py-1">
              +{data.violations.length - 5} more violations
            </p>
          )}
        </div>
      )}

      {/* Powered by */}
      <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-right">
        {t("popup.poweredBy")}
      </p>
    </div>
  );
};
