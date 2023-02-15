import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('route rules', () => {
  it('supports cors', async () => {
    const expectedHeaders = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': '*',
      'access-control-max-age': '86400',
    }
    const { headers } = await callHandler('/rules/cors')
    expect(headers).toMatchObject(expectedHeaders)
  })

  it('supports redirects', async () => {
    const base = await callHandler('/rules/redirect')
    expect(base.status).toBe(307)
    expect(base.headers.location).toBe('/base')

    const obj = await callHandler('/rules/redirect/obj')
    expect(obj.status).toBe(308)
    expect(obj.headers.location).toBe('/other')
  })
})
