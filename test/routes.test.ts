import { describe, expect, it } from 'vitest'
import { $fetch } from 'nitro-test-utils/e2e'

// eslint-disable-next-line test/prefer-lowercase-title
describe('API routes', () => {
  it('returns JSON data', async () => {
    const { body } = await $fetch('/api/hello')
    expect(body).toMatchObject({ message: 'Hello API' })
  })

  it('returns wildcard data', async () => {
    const { body } = await $fetch('/api/wildcard/foo/bar/baz')
    expect(body).toBe('foo/bar/baz')
  })

  it('handles errors', async () => {
    const { status } = await $fetch('/api/error')
    expect(status).toBe(503)
  })

  it('serves static asset /favicon.svg', async () => {
    const { status, headers } = await $fetch('/favicon.svg')
    expect(status).toBe(200)
    expect(headers.etag).toBeDefined()
    expect(headers['content-type']).toMatchInlineSnapshot('"image/svg+xml"')
  })
})
