import { z } from 'zod'

export default defineEventHandler((event) => {
  return useValidatedQuery(event, {
    user: z.string().min(1),
  })
})
