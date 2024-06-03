import { parseAsync } from 'valibot'
import type { BaseIssue, BaseSchemaAsync, InferOutput } from 'valibot'
import type { H3Event } from 'h3'

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

export async function useValidatedQuery<
  T extends BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(event: H3Event, schema: T): Promise<InferOutput<T>> {
  try {
    const query = getQuery(event)
    const parsed = await parseAsync<T>(schema, query)
    return parsed
  } catch (error) {
    console.error(error)
    throw createValidationError(error)
  }
}

export async function useValidatedBody<
  T extends BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(event: H3Event, schema: T): Promise<InferOutput<T>> {
  try {
    const body = await readBody(event)
    const parsed = await parseAsync<T>(schema, body)
    return parsed
  } catch (error) {
    console.error(error)
    throw createValidationError(error)
  }
}
