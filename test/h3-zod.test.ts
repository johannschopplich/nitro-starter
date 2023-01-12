import { describe, expect, it } from 'vitest'
import { callHandler } from './utils'

describe('validate requests using zod schemas', () => {
  describe('validate query', () => {
    it('returns 200 if query matches validation schema', async () => {
      const { data, status } = await callHandler(
        '/api/validate/query?user=nitro'
      )

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
})
