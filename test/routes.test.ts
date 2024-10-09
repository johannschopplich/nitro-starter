import { $fetchRaw } from 'nitro-test-utils/e2e'
import { describe, expect, it } from 'vitest'

// eslint-disable-next-line test/prefer-lowercase-title
describe('API routes', () => {
  it('returns JSON data', async () => {
    const { _data } = await $fetchRaw<Record<string, any>>('/api/hello')
    expect(_data).toMatchInlineSnapshot(`
      {
        "message": "Hello API",
      }
    `)
  })

  it('returns wildcard data', async () => {
    const { _data } = await $fetchRaw<string>('/api/wildcard/foo/bar/baz')
    expect(_data).toBe('foo/bar/baz')
  })

  it('handles errors', async () => {
    const { status } = await $fetchRaw('/api/error')
    expect(status).toBe(503)
  })

  it('serves static asset /favicon.svg', async () => {
    const { status, headers } = await $fetchRaw('/favicon.svg')
    expect(status).toBe(200)
    expect(headers.get('etag')).toBeDefined()
    expect(headers.get('content-type')).toMatchInlineSnapshot('"image/svg+xml"')
  })
})
