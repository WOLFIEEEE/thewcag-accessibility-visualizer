/**
 * Report Export utilities
 * Exports accessibility issues in various formats: JSON, CSV, HTML
 */

import type { RuleResult, RuleResultMessage } from "../rules/type";

export interface AccessibilityIssue {
  type: "error" | "warning";
  ruleName: string;
  message: string;
  elementName: string;
  category: string;
}

export interface AccessibilityReport {
  url: string;
  timestamp: string;
  summary: {
    totalIssues: number;
    errors: number;
    warnings: number;
  };
  issues: AccessibilityIssue[];
}

/**
 * Extract issues from rule results
 */
const extractIssues = (
  ruleResults: { name: string; category: string; results: RuleResult[] }[],
): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  for (const item of ruleResults) {
    for (const result of item.results) {
      if (result.type === "error" || result.type === "warning") {
        const messageResult = result as RuleResultMessage;
        issues.push({
          type: result.type,
          ruleName: messageResult.ruleName,
          message: messageResult.message,
          elementName: item.name,
          category: item.category,
        });
      }
    }
  }

  return issues;
};

/**
 * Create a report from issues
 */
export const createReport = (
  url: string,
  ruleResults: { name: string; category: string; results: RuleResult[] }[],
): AccessibilityReport => {
  const issues = extractIssues(ruleResults);
  const errors = issues.filter((i) => i.type === "error").length;
  const warnings = issues.filter((i) => i.type === "warning").length;

  return {
    url,
    timestamp: new Date().toISOString(),
    summary: {
      totalIssues: issues.length,
      errors,
      warnings,
    },
    issues,
  };
};

/**
 * Export report as JSON
 */
export const exportAsJson = (report: AccessibilityReport): string => {
  return JSON.stringify(report, null, 2);
};

/**
 * Export report as CSV
 */
export const exportAsCsv = (report: AccessibilityReport): string => {
  const header = "Type,Rule,Message,Element,Category";
  const rows = report.issues.map(
    (issue) =>
      `"${issue.type}","${issue.ruleName}","${escapeCSV(issue.message)}","${escapeCSV(issue.elementName)}","${issue.category}"`,
  );

  return [header, ...rows].join("\n");
};

/**
 * Escape a string for CSV
 */
const escapeCSV = (str: string): string => {
  return str.replace(/"/g, '""');
};

/**
 * Export report as HTML
 */
export const exportAsHtml = (report: AccessibilityReport): string => {
  const issueRows = report.issues
    .map(
      (issue) => `
      <tr class="${issue.type}">
        <td><span class="badge ${issue.type}">${issue.type}</span></td>
        <td>${escapeHtml(issue.ruleName)}</td>
        <td>${escapeHtml(issue.message)}</td>
        <td><code>${escapeHtml(issue.elementName)}</code></td>
        <td>${escapeHtml(issue.category)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Report - ${escapeHtml(report.url)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      background: #f5f5f5;
    }
    h1 { color: #1e293b; }
    .meta { color: #64748b; margin-bottom: 24px; }
    .summary {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat {
      padding: 16px 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .stat-value { font-size: 32px; font-weight: bold; }
    .stat-label { color: #64748b; }
    .stat.errors .stat-value { color: #dc2626; }
    .stat.warnings .stat-value { color: #d97706; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    th { background: #f8fafc; font-weight: 600; }
    tr.error { background: #fef2f2; }
    tr.warning { background: #fffbeb; }
    .badge {
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.error { background: #dc2626; color: white; }
    .badge.warning { background: #d97706; color: white; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Accessibility Report</h1>
  <div class="meta">
    <p><strong>URL:</strong> ${escapeHtml(report.url)}</p>
    <p><strong>Generated:</strong> ${report.timestamp}</p>
  </div>

  <div class="summary">
    <div class="stat">
      <div class="stat-value">${report.summary.totalIssues}</div>
      <div class="stat-label">Total Issues</div>
    </div>
    <div class="stat errors">
      <div class="stat-value">${report.summary.errors}</div>
      <div class="stat-label">Errors</div>
    </div>
    <div class="stat warnings">
      <div class="stat-value">${report.summary.warnings}</div>
      <div class="stat-label">Warnings</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Rule</th>
        <th>Message</th>
        <th>Element</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      ${issueRows}
    </tbody>
  </table>

  <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
    Generated by TheWCAG Accessibility Visualizer
  </p>
</body>
</html>`;
};

/**
 * Escape HTML characters
 */
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Download a file
 */
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string,
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Export and download report
 */
export const downloadReport = (
  report: AccessibilityReport,
  format: "json" | "csv" | "html",
): void => {
  const dateStr = new Date().toISOString().split("T")[0];
  const baseFilename = `a11y-report-${dateStr}`;

  switch (format) {
    case "json":
      downloadFile(
        exportAsJson(report),
        `${baseFilename}.json`,
        "application/json",
      );
      break;
    case "csv":
      downloadFile(exportAsCsv(report), `${baseFilename}.csv`, "text/csv");
      break;
    case "html":
      downloadFile(exportAsHtml(report), `${baseFilename}.html`, "text/html");
      break;
  }
};
