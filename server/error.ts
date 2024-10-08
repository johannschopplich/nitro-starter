// Custom error handler for production environment
// See: https://github.com/unjs/nitro/blob/20078be2430bc4615119779a07f4b73e7323df60/src/runtime/error.ts
import type { NitroErrorHandler } from 'nitropack'
import { normalizeError } from 'nitropack/runtime/utils'

export default defineNitroErrorHandler(((error, event) => {
  const { stack, statusCode, statusMessage, message } = normalizeError(error)
  const url = event.path

  // Console output
  if (error.unhandled || error.fatal) {
    const tags = [
      '[nitro]',
      '[request error]',
      error.unhandled && '[unhandled]',
      error.fatal && '[fatal]',
    ]
      .filter(Boolean)
      .join(' ')

    console.error(
      tags,
      `${error.message}\n${stack.map((l) => `  ${l.text}`).join('  \n')}`,
    )
  }

  setResponseStatus(event, statusCode, statusMessage)
  setResponseHeader(event, 'Content-Type', 'application/json')

  return send(
    event,
    JSON.stringify({
      url,
      statusCode,
      statusMessage,
      message,
      stack:
        import.meta.dev && statusCode !== 404
          ? stack.map((i) => i.text)
          : undefined,
    }),
  )
}) satisfies NitroErrorHandler)
