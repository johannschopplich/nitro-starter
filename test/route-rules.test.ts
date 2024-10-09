import { $fetchRaw } from 'nitro-test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('route rules', () => {
  it('supports cors', async () => {
    const { headers } = await $fetchRaw('/rules/cors')
    expect(headers.get('access-control-allow-origin')).toBe('*')
  })

  it('supports redirects', async () => {
    const base = await $fetchRaw('/rules/redirect')
    expect(base.status).toBe(307)
    expect(base.headers.get('location')).toBe('/base')

    const obj = await $fetchRaw('/rules/redirect/obj')
    expect(obj.status).toBe(308)
    expect(obj.headers.get('location')).toBe('/other')
  })
})
