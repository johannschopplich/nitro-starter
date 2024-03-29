import { minLength, objectAsync, string } from 'valibot'

export default defineEventHandler(async (event) => {
  return await useValidatedQuery(
    event,
    objectAsync({
      user: string([minLength(1)]),
    }),
  )
})
