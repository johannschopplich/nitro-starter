// Adapted from https://github.com/wobsoriano/h3-zod

import { createError, eventHandler, getQuery, isMethod, readBody } from 'h3'
import type { EventHandler, H3Event } from 'h3'
import type { z } from 'zod'

// Duplicate private Zod utility type
type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'

type Refined<T extends z.ZodType> = T extends z.ZodType<infer O>
  ? z.ZodEffects<T, O, O>
  : never

export type IOSchema<U extends UnknownKeysParam = any> =
  | z.ZodObject<any, U>
  | z.ZodUnion<[IOSchema<U>, ...IOSchema<U>[]]>
  | z.ZodIntersection<IOSchema<U>, IOSchema<U>>
  | z.ZodDiscriminatedUnion<string, z.Primitive, z.ZodObject<any, U>>
  | Refined<z.ZodObject<any, U>>

export function useValidatedQuery<T extends IOSchema>(
  event: H3Event,
  schema: T,
  /** Use your own error handler instead of throwing an H3Error */
  errorHandler?: (error: z.ZodIssue[]) => void,
) {
  const query = getQuery(event)
  const parsed = schema.safeParse(query)

  if (!parsed.success) {
    if (errorHandler) {
      errorHandler(parsed.error.issues)
      return
    }

    throw createError({
      statusCode: 400,
      statusMessage: JSON.stringify({
        errors: parsed.error.issues,
      }),
    })
  }

  return parsed.data as z.infer<T>
}

export async function useValidatedBody<T extends IOSchema>(
  event: H3Event,
  schema: T,
  /** Use your own error handler instead of throwing an H3Error */
  errorHandler?: (error: z.ZodIssue[]) => void,
) {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    if (errorHandler) {
      errorHandler(parsed.error.issues)
      return
    }

    throw createError({
      statusCode: 400,
      statusMessage: JSON.stringify({
        errors: parsed.error.issues,
      }),
    })
  }

  return parsed.data as z.infer<T>
}

interface RequestSchemas<TBody extends IOSchema, TQuery extends IOSchema> {
  body?: TBody
  query?: TQuery
}

interface RequestIssues {
  body: z.ZodIssue[] | null
  query: z.ZodIssue[] | null
}

export function defineEventHandlerWithSchema<
  TBody extends IOSchema,
  TQuery extends IOSchema,
>({
  handler,
  schema,
  errorHandler,
}: {
  handler: EventHandler
  schema: RequestSchemas<TBody, TQuery>
  errorHandler?: (errors: RequestIssues, event: H3Event) => void
}) {
  return eventHandler(async (event) => {
    const errors: RequestIssues = {
      body: null,
      query: null,
    }

    const parsedData: {
      body: z.infer<TBody> | null
      query: z.infer<TQuery> | null
    } = {
      body: null,
      query: null,
    }

    if (schema.query) {
      const query = getQuery(event)
      const parsed = schema.query.safeParse(query)

      if (!parsed.success) errors.query = parsed.error.issues
      else parsedData.query = parsed.data as z.infer<TQuery>
    }

    if (schema.body && isMethod(event, 'POST')) {
      const body = await readBody(event)
      const parsed = schema.body.safeParse(body)

      if (!parsed.success) errors.body = parsed.error.issues
      else parsedData.body = parsed.data as z.infer<TBody>
    }

    if (errors.body || errors.query) {
      if (errorHandler) {
        errorHandler(errors, event)
        return
      }

      throw createError({
        statusCode: 400,
        statusMessage: JSON.stringify({ errors }),
      })
    }

    event.context.parsedData = parsedData

    return handler(event)
  })
}
