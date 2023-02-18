import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('route rules', () => {
  it('supports cors', async () => {
    const { headers } = await callHandler('/rules/cors')
    expect(headers).toHaveProperty('access-control-allow-origin')
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
