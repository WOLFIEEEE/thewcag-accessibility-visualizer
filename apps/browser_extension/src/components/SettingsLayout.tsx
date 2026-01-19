import React, { type ReactNode, useState } from "react";
import {
  IoCloseOutline,
  IoCloudDownloadOutline,
  IoColorPaletteOutline,
  IoEyeOutline,
  IoGridOutline,
  IoKeyOutline,
  IoMenuOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import icon from "../assets/icon.png";

export type SectionId =
  | "general"
  | "display"
  | "elements"
  | "appearance"
  | "api"
  | "data";

interface NavItem {
  id: SectionId;
  labelKey: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "general",
    labelKey: "settings.sections.general",
    icon: <IoSettingsOutline className="size-5" />,
  },
  {
    id: "display",
    labelKey: "settings.sections.display",
    icon: <IoEyeOutline className="size-5" />,
  },
  {
    id: "elements",
    labelKey: "settings.sections.elements",
    icon: <IoGridOutline className="size-5" />,
  },
  {
    id: "appearance",
    labelKey: "settings.sections.appearance",
    icon: <IoColorPaletteOutline className="size-5" />,
  },
  {
    id: "api",
    labelKey: "settings.sections.api",
    icon: <IoKeyOutline className="size-5" />,
  },
  {
    id: "data",
    labelKey: "settings.sections.data",
    icon: <IoCloudDownloadOutline className="size-5" />,
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  t: (key: string) => string;
  languageSelector?: ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
  t,
  languageSelector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: SectionId) => {
    onSectionChange(sectionId);
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border-color)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
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

            {/* Language selector & Mobile menu button */}
            <div className="flex items-center gap-3">
              {languageSelector}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <IoCloseOutline className="size-6" />
                ) : (
                  <IoMenuOutline className="size-6" />
                )}
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
                aria-current={activeSection === item.id ? "page" : undefined}
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
          <div className="max-w-3xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

// Section Card Component
interface SettingsSectionProps {
  id: SectionId;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  id,
  title,
  description,
  icon,
  children,
}) => {
  return (
    <section
      id={`section-${id}`}
      className="card p-6 scroll-mt-24"
      aria-labelledby={`${id}-title`}
    >
      <div className="flex items-start gap-4 mb-6">
        {icon && (
          <div className="p-2 rounded-lg bg-coral-50 dark:bg-coral-950/30 text-coral-500 dark:text-coral-400">
            {icon}
          </div>
        )}
        <div>
          <h2
            id={`${id}-title`}
            className="text-lg font-semibold text-[var(--text-primary)]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};

// Settings Row Component for consistent layout
interface SettingsRowProps {
  label: string;
  description?: string;
  children: ReactNode;
  htmlFor?: string;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  description,
  children,
  htmlFor,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-[var(--border-color)] last:border-0">
      <div className="flex-1">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
};
