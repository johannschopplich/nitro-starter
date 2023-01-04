import type { H3Event } from 'h3'

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  const { allowedOrigins = [] } = useRuntimeConfig()
  const currentOrigin = (allowedOrigins as string[]).find((i) => i === origin)

  if (!allowedOrigins.includes('*') && !currentOrigin) {
    throw createError({ statusCode: 403, statusMessage: 'Origin not allowed' })
  }

  setResponseHeader(event, 'Access-Control-Allow-Origin', origin || '*')

  // Handle preflight requests
  if (isPreflight(event)) {
    return sendNoContent(event)
  }
})

function isPreflight(event: H3Event) {
  const method = getMethod(event)
  const origin = getRequestHeader(event, 'origin')
  const accessControlRequestMethod = getRequestHeader(
    event,
    'access-control-request-method'
  )

  return method === 'OPTIONS' && !!origin && !!accessControlRequestMethod
}

function sendNoContent(event: H3Event) {
  event.node.res.statusCode = 204
  // 204 responses **must not** have a `Content-Length` header
  // (https://www.rfc-editor.org/rfc/rfc7230#section-3.3.2)
  event.node.res.end()
}
