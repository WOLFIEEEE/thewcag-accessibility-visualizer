import type { RuleResult, RuleResultMessage } from "../rules/type";

export interface AggregatedIssue {
  id: string;
  type: "error" | "warning";
  message: string;
  messageParams?: Record<string, string>;
  category: string;
  count: number;
  elementNames: string[];
}

export interface IssueSummary {
  totalErrors: number;
  totalWarnings: number;
  byCategory: Record<string, AggregatedIssue[]>;
  allIssues: AggregatedIssue[];
}

export interface ElementMetaForSummary {
  name: string;
  ruleResults: RuleResult[];
}

/**
 * Determine the category for an issue based on its rule name
 */
const getCategoryForRule = (ruleName: string): string => {
  const ruleCategories: Record<string, string> = {
    "image-name": "images",
    "image-alt": "images",
    "svg-skip": "images",
    "control-name": "formControls",
    "control-focus": "formControls",
    "label-associated-control": "formControls",
    "radio-group": "formControls",
    "heading-name": "headings",
    "heading-level": "headings",
    hgroup: "headings",
    "link-href": "links",
    "link-target": "links",
    landmark: "sections",
    "page-lang": "page",
    "page-title": "page",
    lang: "lang",
    "table-header": "tables",
    "table-size": "tables",
    "table-position": "tables",
    list: "lists",
    "list-item": "lists",
    "aria-validation": "waiAria",
    "aria-attributes": "waiAria",
    "aria-state": "waiAria",
    "abstract-role": "waiAria",
    "id-reference": "waiAria",
    "contenteditable-role": "waiAria",
    role: "waiAria",
    "tab-index": "tabIndex",
    "target-size": "interactive",
    "nested-interactive": "interactive",
    "iframe-name": "iframes",
    fieldset: "formControls",
    "accessible-name": "general",
    "accessible-description": "general",
  };

  return ruleCategories[ruleName] || "other";
};

/**
 * Create a unique ID for an issue
 */
const createIssueId = (
  type: string,
  message: string,
  category: string,
): string => {
  return `${type}-${category}-${message}`.replace(/\s+/g, "-").toLowerCase();
};

/**
 * Aggregate issues from element metadata
 */
export const aggregateIssues = (
  metaList: ElementMetaForSummary[],
): IssueSummary => {
  const issueMap = new Map<string, AggregatedIssue>();

  for (const meta of metaList) {
    const { name, ruleResults } = meta;

    for (const result of ruleResults) {
      if (result.type !== "error" && result.type !== "warning") {
        continue;
      }

      const messageResult = result as RuleResultMessage;
      const category = getCategoryForRule(messageResult.ruleName);
      const id = createIssueId(
        messageResult.type,
        messageResult.message,
        category,
      );

      const existing = issueMap.get(id);
      if (existing) {
        existing.count++;
        if (!existing.elementNames.includes(name)) {
          existing.elementNames.push(name);
        }
      } else {
        issueMap.set(id, {
          id,
          type: messageResult.type,
          message: messageResult.message,
          messageParams: messageResult.messageParams,
          category,
          count: 1,
          elementNames: [name],
        });
      }
    }
  }

  const allIssues = Array.from(issueMap.values()).sort((a, b) => {
    // Sort errors before warnings, then by count descending
    if (a.type !== b.type) {
      return a.type === "error" ? -1 : 1;
    }
    return b.count - a.count;
  });

  // Group by category
  const byCategory: Record<string, AggregatedIssue[]> = {};
  for (const issue of allIssues) {
    if (!byCategory[issue.category]) {
      byCategory[issue.category] = [];
    }
    byCategory[issue.category].push(issue);
  }

  return {
    totalErrors: allIssues.filter((i) => i.type === "error").length,
    totalWarnings: allIssues.filter((i) => i.type === "warning").length,
    byCategory,
    allIssues,
  };
};

/**
 * Get category display name
 */
export const getCategoryDisplayName = (
  category: string,
  t: (key: string) => string,
): string => {
  const categoryKeys: Record<string, string> = {
    images: "settings.images",
    formControls: "settings.formControls",
    headings: "settings.headings",
    links: "settings.links",
    sections: "settings.sections",
    page: "settings.page",
    lang: "settings.lang",
    tables: "settings.tables",
    lists: "settings.lists",
    waiAria: "settings.waiAria",
    tabIndex: "settings.tabIndex",
    interactive: "summary.interactive",
    iframes: "summary.iframes",
    general: "summary.general",
    other: "summary.other",
  };

  const key = categoryKeys[category];
  return key ? t(key) : category;
};
