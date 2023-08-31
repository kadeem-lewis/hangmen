// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxthq/ui"],
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
  ui: {
    icons: ["mdi"],
  },
});
