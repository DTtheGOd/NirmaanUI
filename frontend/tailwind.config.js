/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        dark: {
          bg: "#050507",
          surface: "#0E0E11",
          border: "#1C1C21",
          text: "#F9FAFB",
          "text-secondary": "#A1A1AA",
          muted: "#4B4B52",
        },
        // Light Mode Colors
        light: {
          bg: "#FFF8DC", // Cornsilk - warm, soft background
          surface: "#FFF8DC",
          border: "#E5E7EB",
          text: "#111827",
          "text-secondary": "#6B7280",
          muted: "#9CA3AF",
        },

        // Primary Accent (Aqua-Mint for both modes)
        accent: {
          DEFAULT: "#00FFC6",
          hover: "#00E6B4",
          pressed: "#00CC9E",
        },

        // Dark Mode Accent Colors
        "dark-accent": {
          red: "#FF4F4F", // Bright Coral Red
          amber: "#FF8A00", // Vivid Amber
          yellow: "#FFD300", // Electric Yellow
          green: "#2DFF72", // Neon Green
          aqua: "#00FFC6", // Aqua Mint
          cyan: "#00D5FF", // Cyan Pop
          indigo: "#4F6BFF", // Vivid Indigo
          violet: "#A14BFF", // Electric Violet
          magenta: "#FF3EC9", // Hot Magenta
          pink: "#FF5E8E", // Neon Pink
        },

        // Light Mode Accent Colors
        "light-accent": {
          red: "#D62828", // Rich Scarlet
          amber: "#F77F00", // Deep Saffron
          yellow: "#FFBA08", // Warm Golden Yellow
          green: "#2ECC71", // Emerald Green
          teal: "#1ABC9C", // Teal Glow
          azure: "#0096C7", // Bright Azure
          indigo: "#4361EE", // Cobalt Indigo
          purple: "#9747FF", // Vibrant Purple
          fuchsia: "#D63384", // Fuchsia Rose
          cerise: "#E85D75", // Soft Cerise
        },

        // Legacy neon colors (for backward compatibility)
        neon: {
          blue: "#0078FF",
          magenta: "#B300FF",
          amber: "#FFB400",
          red: "#FF5A5F",
          emerald: "#00E887",
        },

        // Keep old primary for component compatibility
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#00FFC6",
          600: "#00E6B4",
          700: "#00CC9E",
          800: "#0078FF",
          900: "#B300FF",
        },
      },
      backgroundImage: {
        "gradient-signature":
          "linear-gradient(135deg, #00FFC6, #0078FF, #B300FF)",
        "gradient-dark": "linear-gradient(135deg, #050507, #0E0E11)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
