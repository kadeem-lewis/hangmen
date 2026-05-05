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
      url: "",
    },
  },

  experimental: {
    typedPages: true,
  },

  colorMode: {
    preference: "system",
  },

  compatibilityDate: "2026-05-02",
});
