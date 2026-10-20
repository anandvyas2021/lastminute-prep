import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme variables mapped directly to CSS custom properties
        // No 'dark:' prefix needed in JSX components!
        page: "var(--bg-page)",
        sidebar: "var(--bg-sidebar)",
        card: "var(--bg-card)",
        "card-hover": "var(--bg-card-hover)",
        input: "var(--bg-input)",
        muted: "var(--bg-muted)",
        
        main: "var(--text-main)",
        sub: "var(--text-sub)",
        subtle: "var(--text-muted)",
        
        line: "var(--border-line)",
        "line-strong": "var(--border-strong)",
        
        accent: {
          DEFAULT: "var(--accent-main)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
          text: "var(--accent-text)",
        },
        success: {
          DEFAULT: "var(--success-main)",
          subtle: "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning-main)",
          subtle: "var(--warning-subtle)",
        },
        danger: {
          DEFAULT: "var(--danger-main)",
          subtle: "var(--danger-subtle)",
        },
        code: {
          bg: "var(--code-bg)",
          text: "var(--code-text)",
          border: "var(--code-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
