import { z } from 'zod'

const querySchema = z.object({
  required: z.string().transform(Boolean),
})

const bodySchema = z.object({
  optional: z.string().optional(),
  required: z.boolean(),
})

export default defineEventHandlerWithSchema({
  handler(event) {
    return event.context.parsedData
  },
  schema: {
    body: bodySchema,
    query: querySchema,
  },
})
