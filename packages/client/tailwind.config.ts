import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
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
};
