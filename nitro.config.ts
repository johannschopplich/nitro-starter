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

  routeRules: {
    '/rules/redirect': { redirect: '/base' },
    '/rules/redirect/obj': {
      redirect: { to: '/other', statusCode: 308 },
    },
  },
})
