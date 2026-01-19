// TheWCAG Scanner API Client
// Integrates with https://thewcag.com API for WCAG accessibility scanning

const API_BASE_URL = "https://thewcag.com/api/v1";

export interface ScanResult {
  success: boolean;
  data?: {
    summary: {
      url: string;
      totalViolations: number;
      totalPasses: number;
      violationsBySeverity: {
        critical: number;
        serious: number;
        moderate: number;
        minor: number;
      };
      timestamp: string;
    };
    violations: Array<{
      id: string;
      impact: string;
      description: string;
      help: string;
      helpUrl: string;
      nodes: Array<{
        html: string;
        target: string[];
        failureSummary: string;
      }>;
    }>;
    passes: Array<{
      id: string;
      description: string;
    }>;
  };
  error?: string;
}

export interface ScanOptions {
  wcagVersions?: string[];
  wcagLevel?: "A" | "AA" | "AAA";
}

// Storage key for API key
const API_KEY_STORAGE = "__thewcag_api_key__";

export const getApiKey = async (): Promise<string | null> => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    const result = await chrome.storage.sync.get(API_KEY_STORAGE);
    return result[API_KEY_STORAGE] || null;
  }
  return null;
};

export const setApiKey = async (apiKey: string): Promise<void> => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    await chrome.storage.sync.set({ [API_KEY_STORAGE]: apiKey });
  }
};

export const removeApiKey = async (): Promise<void> => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    await chrome.storage.sync.remove(API_KEY_STORAGE);
  }
};

export const quickScan = async (
  url: string,
  options: ScanOptions = {},
): Promise<ScanResult> => {
  const apiKey = await getApiKey();

  if (!apiKey) {
    return {
      success: false,
      error:
        "API key not configured. Please add your TheWCAG API key in settings.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        url,
        config: {
          wcagVersions: options.wcagVersions || ["2.1", "2.2"],
          wcagLevel: options.wcagLevel || "AA",
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          error: "Invalid API key. Please check your TheWCAG API key.",
        };
      }
      if (response.status === 429) {
        return {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        };
      }
      return {
        success: false,
        error: `Scan failed: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};
