import { z } from 'zod'

export default defineEventHandler((event) => {
  return useValidatedQuery(event, {
    required: z.string(),
  })
})
