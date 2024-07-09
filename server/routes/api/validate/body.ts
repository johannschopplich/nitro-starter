import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  return await useValidatedBody(
    event,
    v.objectAsync({
      optional: v.optional(v.string()),
      required: v.boolean(),
    }),
  )
})
