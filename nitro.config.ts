import { defineNitroConfig } from 'nitropack/config'
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

  imports: {
    presets: [
      {
        from: 'h3-zod',
        imports: [
          'useSafeValidatedBody',
          'useSafeValidatedParams',
          'useSafeValidatedQuery',
          'useValidatedBody',
          'useValidatedParams',
          'useValidatedQuery',
        ],
      },
    ],
  },
})
