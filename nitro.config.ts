import { defineNitroConfig } from 'nitropack'
import nitroPkg from 'nitropack/package.json'

export default defineNitroConfig({
  runtimeConfig: {
    // Replace with allowed URLs in production
    allowedOrigins: ['*'],
    nitroVersion: nitroPkg.version,
  },

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
