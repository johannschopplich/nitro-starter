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
      },
    },
    '/rules/redirect': { redirect: '/base' },
    '/rules/redirect/obj': {
      redirect: { to: '/other', statusCode: 308 },
    },
  },
})
