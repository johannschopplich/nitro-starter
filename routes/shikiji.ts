import type { QueryValue } from 'ufo'
import type { ShikijiTransformer } from 'shikiji'
import {
  bundledLanguages,
  bundledThemes,
  getHighlighterCore,
  loadWasm,
} from 'shikiji'

const EXAMPLE_CODE = `/**
 * This is an example of Shikiji running on Edge
 *
 * Available query parameters:
 *   - code: code to highlight, default to the example
 *   - lang: language to highlight, default to "ts"
 *   - theme: theme to use, default to "vitesse-dark"
 *   - twoslash: enable twoslash, default to false, only works for TypeScript
 *   - style: inject CSS style, default to true
 *
 * Source repo: https://github.com/antfu/nitro-shikiji
 */
// @annotate: Hover on tokens to see the types


import { ref, computed } from '@vue/reactivity'

console.log("Hello World!")

const value = ref(1)
const double = computed(() => value.value * 2)
//      ^?



double.value = 5
`

export default defineLazyEventHandler(async () => {
  await loadWasm({
    data: await import('shikiji/wasm')
      .then((r) => r.getWasmInlined())
      .then((r) => r.data),
  })
  const shiki = await getHighlighterCore()

  return cachedEventHandler(
    async (event) => {
      const {
        code = EXAMPLE_CODE,
        lang = 'ts',
        theme = 'github-dark',
        twoslash = code === EXAMPLE_CODE,
        style = true,
      } = {
        ...getQuery(event),
        ...(event.method === 'POST' ? await readBody(event) : {}),
      } as Record<string, QueryValue>

      if (!bundledLanguages[lang as keyof typeof bundledLanguages])
        return new Response(`Does not support language "${lang}"`, {
          status: 400,
        })
      if (!bundledThemes[theme as keyof typeof bundledThemes])
        return new Response(`Does not support theme "${theme}"`, {
          status: 400,
        })

      const transformers: ShikijiTransformer[] = []

      await Promise.all([
        shiki.loadLanguage(
          bundledLanguages[lang as keyof typeof bundledLanguages],
        ),
        shiki.loadTheme(bundledThemes[theme as keyof typeof bundledThemes]),
        twoslash
          ? import('../examples/twoslash')
              .then((r) => r.prepare(code as string))
              .then(({ transformer }) => transformers.push(transformer))
          : undefined,
      ])

      const result = shiki.codeToHtml(code as string, {
        lang: `${lang}`,
        theme: `${theme}`,
        transformers,
      })

      if (style) {
        const _html = html`
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
              <title>Nitro Shikiji Endpoint</title>
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
              />
              ${getShikijiStyles(shiki.getTheme(`${theme}`)?.type || 'auto')}
            </head>
            <body>
              <header>
                <h1>Nitro Shikiji Endpoint</h1>
                <a
                  href="https://github.com/johannschopplich/nitro-starter/blob/main/routes/shikiji.ts"
                >
                  Source Code
                </a>
              </header>
              <main>${result}</main>
            </body>
          </html>
        `.trimStart()

        return _html
      }

      return result
    },
    {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  )
})

function getShikijiStyles(color: string) {
  return html`
    <link
      rel="stylesheet"
      href="https://esm.sh/shikiji-twoslash/style-rich.css"
    />
    <style>
      html {
        color-scheme: ${color};
      }
      .shiki {
        padding: 2em;
      }
      ${color === 'dark' ? '.twoslash { --twoslash-popup-bg: #24292e; }' : ''}
    </style>
  `.trimStart()
}
