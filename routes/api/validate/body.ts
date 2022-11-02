import { z } from 'zod'

export default defineEventHandler((event) => {
  const bodySchema = z.object({
    optional: z.string().optional(),
    required: z.boolean(),
  })

  return useValidatedBody(event, bodySchema)
})
