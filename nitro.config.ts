import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  runtimeConfig: {
    // Replace with allowed URLs in production
    allowedOrigins: ['*'],
  },

  routeRules: {
    // Enable CORS for all routes
    '/**': {
      headers: {
        // Allow header will be set by middleware if origin is allowed
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allowed-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
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
