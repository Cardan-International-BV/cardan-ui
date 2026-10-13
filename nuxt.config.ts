export default defineNuxtConfig({
  $development: {
    modules: ['@nuxtjs/html-validator'],
  },

  pages: true,

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  // Fonts are only downloaded when a project's CSS uses them, e.g. via --font-family in main.css
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
  },

  typescript: {
    includeWorkspace: true,
  },

  colorMode: {
    classSuffix: '-mode',
  },

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale: 'nl',
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'nl', language: 'nl', file: 'nl.json', name: 'Nederlands' },
    ],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
      },
    },
  },

  htmlValidator: {
    usePrettier: true,
    options: {
      rules: {
        'no-redundant-role': 'off',
        'no-implicit-input-type': 'off',
        'heading-level': 'off',
        'unique-landmark': 'off',
        'prefer-native-element': 'off',
        'no-missing-references': 'off',
        'long-title': 'off',
      },
    },
  },

  devtools: {
    enabled: false,
  },

  compatibilityDate: '2026-04-03',
});
