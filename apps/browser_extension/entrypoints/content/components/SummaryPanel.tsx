import React from "react";
import {
  aggregateIssues,
  type ElementMetaForSummary,
  getCategoryDisplayName,
  type IssueSummary,
} from "../../../src/utils/issueAggregator";
import "./SummaryPanel.css";

interface SummaryPanelProps {
  metaList: ElementMetaForSummary[];
  t: (key: string, options?: Record<string, unknown>) => string;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ metaList, t }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set());
  const [summary, setSummary] = React.useState<IssueSummary | null>(null);

  React.useEffect(() => {
    const newSummary = aggregateIssues(metaList);
    setSummary(newSummary);
  }, [metaList]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  if (!summary) return null;

  const hasIssues = summary.totalErrors > 0 || summary.totalWarnings > 0;

  return (
    <div
      className={`a11y-summary-panel ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <button
        type="button"
        className="a11y-summary-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={t("summary.toggle")}
      >
        <span className="a11y-summary-badge">
          {summary.totalErrors > 0 && (
            <span className="a11y-summary-errors">{summary.totalErrors}</span>
          )}
          {summary.totalWarnings > 0 && (
            <span className="a11y-summary-warnings">
              {summary.totalWarnings}
            </span>
          )}
          {!hasIssues && <span className="a11y-summary-pass">✓</span>}
        </span>
        <span className="a11y-summary-icon">{isExpanded ? "▼" : "▲"}</span>
      </button>

      {isExpanded && (
        <div className="a11y-summary-content">
          <h2 className="a11y-summary-title">{t("summary.title")}</h2>

          {!hasIssues ? (
            <p className="a11y-summary-empty">{t("summary.noIssues")}</p>
          ) : (
            <div className="a11y-summary-stats">
              {summary.totalErrors > 0 && (
                <div className="a11y-summary-stat error">
                  <span className="a11y-summary-stat-count">
                    {summary.totalErrors}
                  </span>
                  <span className="a11y-summary-stat-label">
                    {t("summary.errors")}
                  </span>
                </div>
              )}
              {summary.totalWarnings > 0 && (
                <div className="a11y-summary-stat warning">
                  <span className="a11y-summary-stat-count">
                    {summary.totalWarnings}
                  </span>
                  <span className="a11y-summary-stat-label">
                    {t("summary.warnings")}
                  </span>
                </div>
              )}
            </div>
          )}

          {hasIssues && (
            <div className="a11y-summary-categories">
              {Object.entries(summary.byCategory).map(([category, issues]) => (
                <div key={category} className="a11y-summary-category">
                  <button
                    type="button"
                    className="a11y-summary-category-header"
                    onClick={() => toggleCategory(category)}
                    aria-expanded={expandedCategories.has(category)}
                  >
                    <span className="a11y-summary-category-name">
                      {getCategoryDisplayName(category, t)}
                    </span>
                    <span className="a11y-summary-category-count">
                      {issues.reduce((sum, i) => sum + i.count, 0)}
                    </span>
                    <span className="a11y-summary-category-icon">
                      {expandedCategories.has(category) ? "−" : "+"}
                    </span>
                  </button>

                  {expandedCategories.has(category) && (
                    <ul className="a11y-summary-issues">
                      {issues.map((issue) => (
                        <li
                          key={issue.id}
                          className={`a11y-summary-issue ${issue.type}`}
                        >
                          <div className="a11y-summary-issue-header">
                            <span className="a11y-summary-issue-icon">
                              {issue.type === "error" ? "✗" : "⚠"}
                            </span>
                            <span className="a11y-summary-issue-message">
                              {t(issue.message, issue.messageParams)}
                            </span>
                            <span className="a11y-summary-issue-count">
                              ×{issue.count}
                            </span>
                          </div>
                          {issue.elementNames.length > 0 && (
                            <div className="a11y-summary-issue-elements">
                              {issue.elementNames
                                .slice(0, 3)
                                .map((name, idx) => (
                                  <span
                                    key={`${issue.id}-element-${idx}`}
                                    className="a11y-summary-issue-element-name"
                                  >
                                    {name || "unnamed"}
                                  </span>
                                ))}
                              {issue.elementNames.length > 3 && (
                                <span className="a11y-summary-issue-more">
                                  +{issue.elementNames.length - 3}{" "}
                                  {t("summary.more")}
                                </span>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
