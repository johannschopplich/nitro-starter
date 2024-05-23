import { boolean, objectAsync, optional, string } from 'valibot'

export default defineEventHandler(async (event) => {
  return await useValidatedBody(
    event,
    objectAsync({
      optional: optional(string()),
      required: boolean(),
    }),
  )
})
