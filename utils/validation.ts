import { parseAsync } from 'valibot'
import type { BaseSchemaAsync, Output } from 'valibot'
import type { H3Event } from 'h3'

const DEFAULT_ERROR_STATUS = 400
const DEFAULT_ERROR_MESSAGE = 'Bad Request'

function createBadRequest(error: any) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusMessage: error?.message || DEFAULT_ERROR_MESSAGE,
    data: error,
  })
}

export async function useValidatedQuery<T extends BaseSchemaAsync>(
  event: H3Event,
  schema: T,
): Promise<Output<T>> {
  try {
    const query = getQuery(event)
    const parsed = await parseAsync<T>(schema, query)
    return parsed
  } catch (error) {
    console.error(error)
    throw createBadRequest(error)
  }
}

export async function useValidatedBody<T extends BaseSchemaAsync>(
  event: H3Event,
  schema: T,
): Promise<Output<T>> {
  try {
    const body = await readBody(event)
    const parsed = await parseAsync<T>(schema, body)
    return parsed
  } catch (error) {
    console.error(error)
    throw createBadRequest(error)
  }
}
