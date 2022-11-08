import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'
import { defineNitroConfig } from 'nitropack'

const currentDir = dirname(fileURLToPath(import.meta.url))

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
        from: resolve(currentDir, 'utils/h3-zod'),
        imports: [
          'useValidatedQuery',
          'useValidatedBody',
          'defineEventHandlerWithSchema',
        ],
      },
    ],
  },
})
