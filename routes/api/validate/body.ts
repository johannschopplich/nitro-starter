import { z } from 'zod'

export default defineEventHandler(async (event) => {
  return await useValidatedBody(event, {
    optional: z.string().optional(),
    required: z.boolean(),
  })
})
