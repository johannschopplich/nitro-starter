import { resolve } from 'pathe'
import { joinURL } from 'ufo'
import destr from 'destr'
import { listen } from 'listhen'
import { fetch } from 'ohmyfetch'
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
  server?: Listener
}

export async function setupContext({
  preset = 'node',
  rootDir = process.cwd(),
} = {}) {
  const ctx: Context = {
    preset,
    rootDir,
    outDir: resolve(rootDir, '.output'),
  }

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

  return ctx
}

export async function startServer(ctx: Context) {
  const { listener } = await import(resolve(ctx.outDir, 'server/index.mjs'))
  ctx.server = await listen(listener)

  return async function () {
    if (ctx.server) await ctx.server.close()
    if (ctx.nitro) await ctx.nitro.close()
  }
}

export async function callHandler(url: string, init?: RequestInit) {
  const result = await fetch(joinURL(process.env.NITRO_SERVER_URL!, url), {
    ...init,
    redirect: 'manual',
  })

  return {
    data: destr(await result.text()),
    status: result.status,
    headers: Object.fromEntries(result.headers.entries()),
  }
}
