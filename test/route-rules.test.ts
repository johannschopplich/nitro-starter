import { describe, expect, it } from 'vitest'
import { $fetch } from 'nitro-test-utils/e2e'

describe('route rules', () => {
  it('supports cors', async () => {
    const { headers } = await $fetch('/rules/cors')
    expect(headers.get('access-control-allow-origin')).toBe('*')
  })

  it('supports redirects', async () => {
    const base = await $fetch('/rules/redirect')
    expect(base.status).toBe(307)
    expect(base.headers.get('location')).toBe('/base')

    const obj = await $fetch('/rules/redirect/obj')
    expect(obj.status).toBe(308)
    expect(obj.headers.get('location')).toBe('/other')
  })
})
