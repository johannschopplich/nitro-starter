// eslint-disable-next-line antfu/no-import-node-modules-by-path
import nitroPkg from './node_modules/nitropack/package.json'

export default defineNitroConfig({
  runtimeConfig: {
    // Replace with allowed URLs in production
    allowedOrigins: ['*'],
    nitroVersion: nitroPkg.version,
  },

  // Optional custom error handler
  errorHandler: '~/error',

  routeRules: {
    '/rules/redirect': { redirect: '/base' },
    '/rules/redirect/obj': {
      redirect: { to: '/other', statusCode: 308 },
    },
  },
})
