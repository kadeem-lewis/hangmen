// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/eslint-module"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      socketPort: 3001,
      url: process.env.URL || "http://localhost",
    },
  },
  plugins: ["./plugins/socket.io"],
  nitro: {
    plugins: ["./plugins/socket.io.server"],
  },
});
