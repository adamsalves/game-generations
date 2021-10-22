export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'game-generations',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Exo:wght@100;400;600&family=Roboto:wght@400;700&display=swap',
      },
    ]
  },

  loadingIndicator: {
    name: 'pulse',
    color: '#868686',
    background: 'white'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/stylesheet.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/services' },
    { src: '~plugins/filters' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image',
  ],

  image: {
    domains: ['https://raw.githubusercontent.com/']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    [
    '@nuxtjs/fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
    }
  ],
  ],

  axios: {
    baseURL: 'https://pokeapi.co/api/v2/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Style Resources
  styleResources: {
    css: ['./assets/css/*.css'],
  },
}
