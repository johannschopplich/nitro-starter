import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  // Some test rules to show Nitro's route features
  routeRules: {
    '/rules/headers': { headers: { 'cache-control': 's-maxage=60' } },
    '/rules/cors': {
      cors: true,
      headers: { 'access-control-allowed-methods': 'GET' },
    },
    '/rules/redirect': { redirect: '/base' },
    '/rules/redirect/obj': {
      redirect: { to: 'https://nitro.unjs.io/', statusCode: 308 },
    },
    '/rules/nested/**': { redirect: '/base', headers: { 'x-test': 'test' } },
    '/rules/nested/override': { redirect: { to: '/other' } },
  },
})
