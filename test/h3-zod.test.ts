import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('validate requests using zod schemas', () => {
  describe('validate query', () => {
    it('returns 200 if query matches validation schema', async () => {
      const { data, status } = await callHandler('/api/validate/query?required')

      expect(status).toBe(200)
      expect(data).toMatchSnapshot()
    })

    it('throws 400 if query does not match validation schema', async () => {
      const { data, status } = await callHandler('/api/validate/query')

      expect(status).toBe(400)
      expect(data).toMatchSnapshot()
    })
  })

  describe('validate body', () => {
    it('returns 200 if body matches validation schema', async () => {
      const { data, status } = await callHandler('/api/validate/body', {
        method: 'POST',
        body: JSON.stringify({ required: true }),
      })

      expect(status).toBe(200)
      expect(data).toMatchSnapshot()
    })

    it('throws 400 if body does not match validation schema', async () => {
      const { data, status } = await callHandler('/api/validate/body', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      expect(status).toBe(400)
      expect(data).toMatchSnapshot()
    })
  })

  describe('event handler with schema', () => {
    it('returns 200 if query/body matches validation schema', async () => {
      const { data, status } = await callHandler(
        '/api/validate/handler?required=true',
        {
          method: 'POST',
          body: JSON.stringify({ required: true }),
        },
      )

      expect(status).toBe(200)
      expect(data).toMatchSnapshot()
    })

    it('throws 400 if query/body does not match validation schema', async () => {
      const { data, status } = await callHandler(
        '/api/validate/handler?required=true',
        { method: 'POST' },
      )

      expect(status).toEqual(400)
      expect(data).toMatchSnapshot()
    })

    it('passes parsed data to "event.context"', async () => {
      const { data } = await callHandler(
        '/api/validate/handler?required=true',
        {
          method: 'POST',
          body: JSON.stringify({ required: true }),
        },
      )

      expect(data.query.required).toBe(true)
      expect(data.body.required).toBe(true)
    })
  })
})
