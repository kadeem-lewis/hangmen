// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/fonts",
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
  experimental: {
    typedPages: true,
  },
  plugins: ["./plugins/socket.io"],
  typescript: {
    typeCheck: true,
  },
  colorMode: {
    preference: "system",
  },
});
