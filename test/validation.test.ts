import { describe, expect, it } from 'vitest'
import { $fetch } from 'nitro-test-utils'

describe('validate requests using valibot schemas', () => {
  describe('validate query', () => {
    it('returns 200 if query matches validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/query?user=nitro')

      expect(status).toBe(200)
      expect(body).toMatchSnapshot()
    })

    it('throws 400 if query does not match validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/query')

      expect(status).toBe(400)
      expect(body).toMatchSnapshot()
    })
  })

  describe('validate body', () => {
    it('returns 200 if body matches validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/body', {
        method: 'POST',
        body: JSON.stringify({ required: true }),
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(200)
      expect(body).toMatchSnapshot()
    })

    it('throws 400 if body does not match validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/body', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(400)
      expect(body).toMatchSnapshot()
    })
  })
})
