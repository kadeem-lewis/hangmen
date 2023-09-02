// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-headlessui",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      url: process.env.URL || "http://localhost:3001",
    },
  },
  plugins: ["./plugins/socket.io"],
  googleFonts: {
    families: {
      "Open+Sans": true,
      "Short+Stack": true,
    },
    display: "swap",
  },
  colorMode: {
    preference: "system",
  },
});
