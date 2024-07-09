import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  return await useValidatedQuery(
    event,
    v.objectAsync({
      user: v.pipe(v.string(), v.minLength(1)),
    }),
  )
})
