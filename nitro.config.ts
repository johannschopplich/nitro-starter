import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'
import { defineNitroConfig } from 'nitropack'

const _dirname = dirname(fileURLToPath(import.meta.url))

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

  imports: {
    presets: [
      {
        from: resolve(_dirname, 'utils/h3-zod'),
        imports: [
          'useValidatedQuery',
          'useValidatedBody',
          'defineEventHandlerWithSchema',
        ],
      },
    ],
  },
})
