import type { H3Event } from 'h3'
import * as v from 'valibot'

const DEFAULT_ERROR_STATUS = 400
const DEFAULT_ERROR_MESSAGE = 'Validation Error'

function createValidationError(error: any) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusMessage: DEFAULT_ERROR_MESSAGE,
    message: error?.message || DEFAULT_ERROR_MESSAGE,
    data: error,
  })
}

export function useValidatedQuery<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(event: H3Event, schema: T): v.InferOutput<T> {
  try {
    const query = getQuery(event)
    const parsed = v.parse<T>(schema, query)
    return parsed
  } catch (error) {
    console.error(error)
    throw createValidationError(error)
  }
}

export async function useValidatedBody<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(event: H3Event, schema: T): Promise<v.InferOutput<T>> {
  try {
    const body = await readBody(event)
    const parsed = v.parse<T>(schema, body)
    return parsed
  } catch (error) {
    console.error(error)
    throw createValidationError(error)
  }
}
