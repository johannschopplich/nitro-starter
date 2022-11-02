import { z } from 'zod'

export default defineEventHandler((event) => {
  const querySchema = z.object({
    required: z.string(),
  })

  return useValidatedQuery(event, querySchema)
})
