import { describe, expect, it } from 'vitest'
import { setupNitro } from './utils'

describe('handle route rules', async () => {
  const { callHandler } = await setupNitro()

  it('cors', async () => {
    const expectedHeaders = {
      'access-control-allow-origin': '*',
      'access-control-allowed-methods': 'GET',
      'access-control-allow-headers': '*',
      'access-control-max-age': '0',
    }
    const { headers } = await callHandler({ url: '/rules/cors' })
    expect(headers).toMatchObject(expectedHeaders)
  })

  it('redirects', async () => {
    const base = await callHandler({ url: '/rules/redirect' })
    expect(base.status).toBe(307)
    expect(base.headers.location).toBe('/base')

    const obj = await callHandler({ url: '/rules/redirect/obj' })
    expect(obj.status).toBe(308)
    expect(obj.headers.location).toBe('https://nitro.unjs.io/')
  })

  it('headers', async () => {
    const { headers } = await callHandler({ url: '/rules/headers' })
    expect(headers['cache-control']).toBe('s-maxage=60')
  })

  it('cors', async () => {
    const expectedHeaders = {
      'access-control-allow-origin': '*',
      'access-control-allowed-methods': 'GET',
      'access-control-allow-headers': '*',
      'access-control-max-age': '0',
    }
    const { headers } = await callHandler({ url: '/rules/cors' })
    expect(headers).toMatchObject(expectedHeaders)
  })

  it('allowing overriding', async () => {
    const override = await callHandler({ url: '/rules/nested/override' })
    expect(override.headers.location).toBe('/other')
    expect(override.headers['x-test']).toBe('test')

    const base = await callHandler({ url: '/rules/nested/base' })
    expect(base.headers.location).toBe('/base')
    expect(base.headers['x-test']).toBe('test')
  })
})
