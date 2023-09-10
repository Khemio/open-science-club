// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      url: process.env.NUXT_SITE_URL
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/main.css'],
  supabase: {
    redirect: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
