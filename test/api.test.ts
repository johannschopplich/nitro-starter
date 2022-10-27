import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('handle API routes', async () => {
  it('fetches plain data', async () => {
    const { data: helloData } = await callHandler({ url: '/api/hello' })
    expect(helloData).toMatchObject({ message: 'Hello API' })
  })

  it('fetches wildcard data', async () => {
    const { data: paramsData2 } = await callHandler({
      url: '/api/wildcard/foo/bar/baz',
    })
    expect(paramsData2).toBe('foo/bar/baz')
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