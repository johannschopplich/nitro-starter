// eslint-disable-next-line antfu/no-import-node-modules-by-path
import nitroPkg from './node_modules/nitropack/package.json'

export default defineNitroConfig({
  srcDir: 'server',

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
    // @ts-expect-error: Nitro types are not up to date
    openAPI: {
      meta: {
        title: 'Kirby.tools License API',
        description: 'API for managing Kirby.tools licenses',
        version: '1.0.0',
      },
    },
  },
})
