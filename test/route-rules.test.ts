import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('handle route rules', async () => {
  it('supports cors', async () => {
    const expectedHeaders = {
      'access-control-allow-origin': '*',
      'access-control-allowed-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': '*',
      'access-control-max-age': '0',
    }
    const { headers } = await callHandler({ url: '/rules/cors' })
    expect(headers).toMatchObject(expectedHeaders)
  })

  it('supports redirects', async () => {
    const base = await callHandler({ url: '/rules/redirect' })
    expect(base.status).toBe(307)
    expect(base.headers.location).toBe('/base')

    const obj = await callHandler({ url: '/rules/redirect/obj' })
    expect(obj.status).toBe(308)
    expect(obj.headers.location).toBe('/other')
  })
})
