// Custom error handler for production environment
// See: https://github.com/unjs/nitro/blob/4111798a09fde7bf5916500637e27d6acc0189d1/src/runtime/error.ts
import { setResponseHeader, setResponseStatus } from 'h3'
import type { NitroErrorHandler } from 'nitropack'

export default (function (error, event) {
  const statusCode = error.statusCode || 500
  const statusMessage =
    error.statusMessage ?? (statusCode === 404 ? 'Not Found' : '')
  const message = error.message || error.toString()

  setResponseStatus(event, statusCode, statusMessage)
  setResponseHeader(event, 'Content-Type', 'application/json')

  event.node.res.end(
    JSON.stringify({
      url: event.node.req.url || '',
      statusCode,
      statusMessage,
      message,
    })
  )
} satisfies NitroErrorHandler)
