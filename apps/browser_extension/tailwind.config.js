/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./entrypoints/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude.ai inspired warm coral accent
        coral: {
          50: "#FEF6F3",
          100: "#FDEBE5",
          200: "#FBCFC0",
          300: "#F5A88E",
          400: "#E8926C",
          500: "#DA7756",
          600: "#C45D3D",
          700: "#A24830",
          800: "#7D3825",
          900: "#5C2B1D",
          950: "#3D1A10",
        },
        // Warm cream backgrounds
        cream: {
          50: "#FFFDFB",
          100: "#FAF9F5",
          200: "#F5F3ED",
          300: "#EBE8E0",
          400: "#DBD7CC",
          500: "#C4BFB3",
        },
      },
      backgroundColor: {
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        "surface-hover": "var(--bg-surface-hover)",
        muted: "var(--bg-muted)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        accent: "var(--text-accent)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
        strong: "var(--border-strong)",
      },
      ringColor: {
        accent: "var(--ring-accent)",
      },
    },
  },
  plugins: [],
};
