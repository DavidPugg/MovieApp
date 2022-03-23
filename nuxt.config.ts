export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'movie-app',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap',
                rel: 'stylesheet',
            },
            {
                href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Source+Sans+Pro:wght@300&display=swap',
                rel: 'stylesheet',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/main.scss', '~/assets/css/spinner.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/directives.ts'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: {
        dirs: ['~/components', '~/components/atoms', '~/components/molecules', '~/components/organisms'],
    },

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/style-resources', '@nuxtjs/composition-api/module', '@nuxt/typescript-build'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    styleResources: {
        scss: ['./assets/css/main.scss'],
    },

    env: {
        apiKey: process.env.API_KEY,
    },

    server: {
        port: process.env.PORT || 3000,
    },

    typescript: {
        typeCheck: {
            eslint: {
                files: './**/*.{ts,js,vue}',
            },
        },
    },
};
