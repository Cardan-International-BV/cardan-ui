import { defaultIcons } from './utils/defaultIcons';

export default defineNuxtConfig({
  extends: ['..'],

  $production: {
    image: {
      domains: ['i.ytimg.com'],
    },
  },

  i18n: {
    defaultLocale: 'en',
  },

  app: {
    head: {
      title: 'Cardan UI',
      link: [{ rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  modules: ['@nuxt/image', '@nuxt/scripts'],

  css: ['~/assets/playground.css'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: defaultIcons,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'markdown-it',
        'highlight.js/lib/core',
        'highlight.js/lib/languages/css',
        'highlight.js/lib/languages/javascript',
        'highlight.js/lib/languages/typescript',
        'highlight.js/lib/common',
        '@mdit/plugin-attrs',
        '@mdit/plugin-mark',
        'vue-axe',
        'date-fns/locale',
        '@vuepic/vue-datepicker',
        '@vueform/multiselect',
        'compressorjs',
      ],
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
