import type { H3Event } from 'h3'

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  const { allowedOrigins = [] } = useRuntimeConfig()
  const currentOrigin = (allowedOrigins as string[]).find((i) => i === origin)

  if (!allowedOrigins.includes('*') && !currentOrigin) {
    throw createError({ statusCode: 403, statusMessage: 'Origin not allowed' })
  }

  setResponseHeader(event, 'access-control-allow-origin', origin || '*')

  if (isPreflight(event)) {
    event.node.res.statusCode = 204
    event.node.res.setHeader('content-length', '0')
    event.node.res.end()
    return
  }
})

function isPreflight(event: H3Event) {
  const method = getMethod(event)
  const origin = getRequestHeader(event, 'origin')
  const accessControlRequestMethod = getRequestHeader(
    event,
    'access-control-request-method',
  )

  return method === 'OPTIONS' && !!origin && !!accessControlRequestMethod
}
