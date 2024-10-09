import { $fetchRaw } from 'nitro-test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('validate requests using valibot schemas', () => {
  describe('validate query', () => {
    it('returns 200 if query matches validation schema', async () => {
      const { _data, status } = await $fetchRaw(
        '/api/validate/query?user=nitro',
      )

      expect(status).toBe(200)
      expect(_data).toMatchInlineSnapshot(`
        {
          "user": "nitro",
        }
      `)
    })

    it('throws 400 if query does not match validation schema', async () => {
      const { _data, status } = await $fetchRaw('/api/validate/query')

      expect(status).toBe(400)
      expect(_data.message).toMatchInlineSnapshot(
        `"Invalid type: Expected string but received undefined"`,
      )
    })
  })

  describe('validate body', () => {
    it('returns 200 if body matches validation schema', async () => {
      const { _data, status } = await $fetchRaw('/api/validate/body', {
        method: 'POST',
        body: { required: true },
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(200)
      expect(_data).toMatchInlineSnapshot(`
        {
          "required": true,
        }
      `)
    })

    it('throws 400 if body does not match validation schema', async () => {
      const { _data, status } = await $fetchRaw('/api/validate/body', {
        method: 'POST',
        body: {},
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(status).toBe(400)
      expect(_data.message).toMatchInlineSnapshot(
        `"Invalid type: Expected boolean but received undefined"`,
      )
    })
  })
})
