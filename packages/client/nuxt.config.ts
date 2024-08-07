// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/ui",
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
  typescript: {
    typeCheck: true,
  },
  colorMode: {
    preference: "system",
  },
});
