import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('handle API routes', async () => {
  it('fetches plain data', async () => {
    const { data } = await callHandler({ url: '/api/hello' })
    expect(data).toMatchObject({ message: 'Hello API' })
  })

  it('fetches wildcard data', async () => {
    const { data } = await callHandler({
      url: '/api/wildcard/foo/bar/baz',
    })
    expect(data).toBe('foo/bar/baz')
  })

  it('handles errors', async () => {
    const { status } = await callHandler({
      url: '/api/error',
    })
    expect(status).toBe(503)
  })

  it('serve static asset /favicon.svg', async () => {
    const { status, headers } = await callHandler({ url: '/favicon.svg' })
    expect(status).toBe(200)
    expect(headers.etag).toBeDefined()
    expect(headers['content-type']).toMatchInlineSnapshot('"image/svg+xml"')
  })
})
