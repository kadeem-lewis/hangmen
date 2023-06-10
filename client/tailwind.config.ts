import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "dark-mode": {
          100: "hsl(0,0%,42%)",
          200: "hsl(0,0%,35%)",
          300: "hsl(0,0%,28%)",
          400: "hsl(0,0%,21%)",
          500: "hsl(0,0%,14%)",
          600: "hsl(0,0%,7%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
