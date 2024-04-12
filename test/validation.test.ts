import { describe, expect, it } from 'vitest'
import { $fetch } from 'nitro-test-utils/e2e'

describe('validate requests using valibot schemas', () => {
  describe('validate query', () => {
    it('returns 200 if query matches validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/query?user=nitro')

      expect(status).toBe(200)
      expect(body).toMatchInlineSnapshot(
        `
        {
          "user": "nitro",
        }
      `,
      )
    })

    it('throws 400 if query does not match validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/query')

      expect(status).toBe(400)
      expect(body.message).toMatchInlineSnapshot(
        `"Invalid type: Expected string but received undefined"`,
      )
    })
  })

  describe('validate body', () => {
    it('returns 200 if body matches validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/body', {
        method: 'POST',
        body: { required: true },
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(200)
      expect(body).toMatchInlineSnapshot(`
        {
          "required": true,
        }
      `)
    })

    it('throws 400 if body does not match validation schema', async () => {
      const { body, status } = await $fetch('/api/validate/body', {
        method: 'POST',
        body: {},
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(400)
      expect(body.message).toMatchInlineSnapshot(
        `"Invalid type: Expected boolean but received undefined"`,
      )
    })
  })
})
