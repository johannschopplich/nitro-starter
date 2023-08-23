import { getValidatedQuery } from 'h3'
import { z } from 'zod'
import type { H3Event } from 'h3'

type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'

type Schema<U extends UnknownKeysParam = any> =
  | z.ZodObject<any, U>
  | z.ZodUnion<[Schema<U>, ...Schema<U>[]]>
  | z.ZodIntersection<Schema<U>, Schema<U>>
  | z.ZodDiscriminatedUnion<string, z.ZodObject<any, U>[]>
  | z.ZodEffects<z.ZodTypeAny>

type ParsedData<T extends Schema | z.ZodRawShape> = T extends Schema
  ? z.output<T>
  : T extends z.ZodRawShape
  ? z.output<z.ZodObject<T>>
  : never

export function useValidatedQuery<T extends Schema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
): Promise<ParsedData<T>> {
  return getValidatedQuery(event, validateSchemaFn(schema))
}

export function useValidatedBody<T extends Schema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
): Promise<ParsedData<T>> {
  return readValidatedBody(event, validateSchemaFn(schema))
}

function validateSchemaFn<T extends Schema | z.ZodRawShape>(schema: T) {
  return async function (data: unknown) {
    const _schema = schema instanceof z.ZodType ? schema : z.object(schema)

    try {
      return await _schema.parseAsync(data)
    } catch (error) {
      // Stringify zod error to avoid circular structure
      throw new Error(JSON.stringify(error))
    }
  }
}
