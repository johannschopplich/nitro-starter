import { minLength, objectAsync, pipe, string } from 'valibot'

export default defineEventHandler(async (event) => {
  return await useValidatedQuery(
    event,
    objectAsync({
      user: pipe(string(), minLength(1)),
    }),
  )
})
