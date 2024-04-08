import { promisify } from 'node:util'
import zlib from 'node:zlib'
import type { Buffer } from 'node:buffer'
import type { H3Event } from 'h3'

export async function maybeCompressedSend(event: H3Event, response: Buffer) {
  const encodingMethod = getAnyCompression(event)

  if (encodingMethod) {
    const compression = promisify(
      zlib[encodingMethod === 'br' ? 'brotliCompress' : encodingMethod],
    )
    setResponseHeader(event, 'Content-Encoding', encodingMethod)
    return send(event, await compression(response))
  }

  return send(event, response)
}

function getAnyCompression(event: H3Event) {
  const encoding = getRequestHeader(event, 'accept-encoding')

  if (encoding?.includes('br')) return 'br'
  if (encoding?.includes('gzip')) return 'gzip'
  if (encoding?.includes('deflate')) return 'deflate'

  return undefined
}
