// Custom error handler for production environment
// See: https://github.com/unjs/nitro/blob/20078be2430bc4615119779a07f4b73e7323df60/src/runtime/error.ts
import { setResponseHeader, setResponseStatus } from 'h3'
import type { H3Error } from 'h3'
import type { NitroErrorHandler } from 'nitropack'

const isDev = process.env.NODE_ENV === 'development'

const errorHandler: NitroErrorHandler = function (error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error)
  const url = event.node.req.url || ''

  setResponseStatus(event, statusCode, statusMessage)
  setResponseHeader(event, 'Content-Type', 'application/json')

  event.node.res.end(
    JSON.stringify({
      url,
      statusCode,
      statusMessage,
      message,
      stack: isDev && statusCode !== 404 ? stack.map((i) => i.text) : undefined,
    })
  )
}

export default errorHandler

function normalizeError(error: H3Error) {
  const cwd = typeof process.cwd === 'function' ? process.cwd() : '/'
  const stack = (error.stack || '')
    .split('\n')
    .splice(1)
    .filter((line) => line.includes('at '))
    .map((line) => {
      const text = line
        .replace(cwd + '/', './')
        .replace('webpack:/', '')
        .replace('file://', '')
        .trim()
      return {
        text,
        internal:
          (line.includes('node_modules') && !line.includes('.cache')) ||
          line.includes('internal') ||
          line.includes('new Promise'),
      }
    })

  const statusCode = error.statusCode || 500
  const statusMessage =
    error.statusMessage ?? (statusCode === 404 ? 'Not Found' : '')
  const message = error.message || error.toString()

  return {
    stack,
    statusCode,
    statusMessage,
    message,
  }
}
