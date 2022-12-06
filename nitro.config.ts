import 'dotenv/config'
import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  runtimeConfig: {
    // Replace with allowed URLs in production
    allowedOrigins: ['*'],
  },

  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'access-control-allowed-methods': 'GET, POST, OPTIONS',
        'access-control-max-age': '86400',
      },
    },
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
