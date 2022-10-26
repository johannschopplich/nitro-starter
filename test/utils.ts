import { resolve } from 'pathe'
import { listen } from 'listhen'
import { fetch } from 'ohmyfetch'
import { afterAll } from 'vitest'
import destr from 'destr'
import { joinURL } from 'ufo'
import {
  build,
  copyPublicAssets,
  createNitro,
  prepare,
  prerender,
} from 'nitropack'
import type { Listener } from 'listhen'
import type { Nitro } from 'nitropack'

interface Context {
  preset: string
  nitro?: Nitro
  rootDir: string
  outDir: string
  fetch: (url: string) => Promise<any>
  server?: Listener
}

interface TestHandlerResult {
  data: any
  status: number
  headers: Record<string, string>
}

const instanceMap = new Map<string, Context>()

export async function setupNitro({
  preset = 'node',
  rootDir = process.cwd(),
} = {}) {
  const ctx: Context = instanceMap.get(preset) ?? {
    preset,
    rootDir,
    outDir: resolve(rootDir, '.output'),
    fetch: (url) =>
      fetch(joinURL(ctx.server!.url, url.slice(1)), { redirect: 'manual' }),
  }

  if (!instanceMap.has(preset)) {
    const nitro = (ctx.nitro = await createNitro({
      preset: ctx.preset,
      rootDir: ctx.rootDir,
      serveStatic: preset !== 'cloudflare' && preset !== 'vercel-edge',
      output: { dir: ctx.outDir },
    }))

    await prepare(nitro)
    await copyPublicAssets(nitro)
    await prerender(nitro)
    await build(nitro)

    instanceMap.set(preset, ctx)
  }

  const { listener } = await import(resolve(ctx.outDir, 'server/index.mjs'))
  ctx.server = await listen(listener)

  const callHandler = async (options: {
    url: string
  }): Promise<TestHandlerResult> => {
    const result = await ctx.fetch(options.url)

    if (result.constructor.name !== 'Response') {
      return result
    }

    return {
      data: destr(await (result as Response).text()),
      status: result.status,
      headers: Object.fromEntries((result as Response).headers.entries()),
    }
  }

  afterAll(async () => {
    if (ctx.server) await ctx.server.close()
    if (ctx.nitro) await ctx.nitro.close()
  })

  return { ctx, callHandler }
}
