import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  return useValidatedQuery(
    event,
    v.object({
      user: v.pipe(v.string(), v.minLength(1)),
    }),
  )
})
