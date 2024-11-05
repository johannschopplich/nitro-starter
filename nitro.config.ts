// eslint-disable-next-line antfu/no-import-node-modules-by-path
import nitroPkg from './node_modules/nitropack/package.json'

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2024-09-19',

  runtimeConfig: {
    cors: {
      // Replace with allowed production URLs
      origins: ['*'],
    },

    nitroVersion: nitroPkg.version,
  },

  errorHandler: '~/error',

  routeRules: {
    '/rules/redirect': { redirect: '/base' },
    '/rules/redirect/obj': {
      redirect: { to: '/other', statusCode: 308 },
    },
  },

  experimental: {
    openAPI: true,
  },

  openAPI: {
    production: 'runtime',
    meta: {
      title: 'Nitro Starter API',
      version: '1.0.0',
    },
    ui: {
      scalar: false,
    },
  },
})
