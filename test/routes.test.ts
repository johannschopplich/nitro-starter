import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

// eslint-disable-next-line test/prefer-lowercase-title
describe('API routes', () => {
  it('returns JSON data', async () => {
    const { data } = await callHandler('/api/hello')
    expect(data).toMatchObject({ message: 'Hello API' })
  })

  it('returns wildcard data', async () => {
    const { data } = await callHandler('/api/wildcard/foo/bar/baz')
    expect(data).toBe('foo/bar/baz')
  })

  it('handles errors', async () => {
    const { status } = await callHandler('/api/error')
    expect(status).toBe(503)
  })

  it('serves static asset /favicon.svg', async () => {
    const { status, headers } = await callHandler('/favicon.svg')
    expect(status).toBe(200)
    expect(headers.etag).toBeDefined()
    expect(headers['content-type']).toMatchInlineSnapshot('"image/svg+xml"')
  })
})
