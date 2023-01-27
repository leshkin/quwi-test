export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'quwi-test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css', '@/assets/normalize.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.quwi.com/v2',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
          },
          user: false,
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
  },
}
