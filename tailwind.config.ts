import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Palette derivation (see scripts/extract-colors.mjs + scripts/build-palette.mjs):
//
// 1. `logo-mark.png` (cropped from the client's own logo animation asset) was run through
//    node-vibrant, which returned a DarkVibrant swatch of #041c45 as the highest-population
//    color in the mark — the navy used in the wordmark and badge ring.
// 2. That navy, plus the crimson used in the "NEWS" wordmark / tagline bar (#b90c12, sampled
//    directly from the source frame for a crisper value than Vibrant's blended "Vibrant"
//    swatch), were each expanded into an 11-step 50-950 scale using a fixed Tailwind-style
//    lightness curve at the extracted hue/saturation.
// 3. `saffron` and `green` are sampled directly from the eye-icon strokes (India-flag
//    tricolor) and are used only as sparing accent/tag colors, never for body text or large
//    surfaces.
// 4. The neutral scale is NOT generic slate — it's desaturated at the *navy's own hue*
//    (~217°) so grays read as a cool, editorial charcoal rather than a default gray, matching
//    the logo's cool undertone.
// 5. Every text/background pairing actually used in the UI was checked against WCAG AA
//    (4.5:1 body text) — see the contrast log in scripts/build-palette.mjs output. primary-700+
//    on white, white on primary-600+, neutral-600+ on white, and accent-600+ on/with white all
//    clear 5.5:1 or better.

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dominant: extracted from the logo (navy wordmark/ring).
        primary: {
          50: "#f2f6fc",
          100: "#e6eefa",
          200: "#c8daf4",
          300: "#a2c0ec",
          400: "#6b9ae0",
          500: "#3475d5",
          600: "#255eb1",
          700: "#1d4a8b",
          800: "#16386a",
          900: "#10284c",
          950: "#0a192e",
        },
        // Extracted: crimson from the "NEWS" wordmark and tagline bar.
        accent: {
          50: "#fef0f1",
          100: "#fee2e3",
          200: "#fcbfc1",
          300: "#fb9397",
          400: "#f85359",
          500: "#f5141c",
          600: "#ce080f",
          700: "#a2070c",
          800: "#7b0509",
          900: "#580407",
          950: "#360204",
        },
        // Derived: desaturated at the navy's hue rather than generic slate.
        neutral: {
          50: "#f6f7f8",
          100: "#eeeff2",
          200: "#dadde2",
          300: "#c0c6ce",
          400: "#9ba4b0",
          500: "#768293",
          600: "#5e6978",
          700: "#4a525e",
          800: "#383e47",
          900: "#282d33",
          950: "#191b1f",
        },
        // Extracted directly from the eye-icon strokes; sparing accent use only
        // (tags, dividers, the tricolor rule under the masthead) — never body copy.
        saffron: "#e4781e",
        flagGreen: "#358e62",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;
