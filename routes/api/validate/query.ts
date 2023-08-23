import { z } from 'zod'

export default defineEventHandler(async (event) => {
  return await useValidatedQuery(event, {
    user: z.string().min(1),
  })
})
