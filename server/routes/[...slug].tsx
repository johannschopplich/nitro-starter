import { h, renderSSR } from 'nano-jsx'
import { Base } from '~/components/index.tsx'

export default defineEventHandler(() => {
  const links = [
    '/stream',
    '/api/hello',
    '/api/validate/body',
    '/api/validate/query?user=nitro',
    '/api/wildcard/foo/bar',
    '/api/error',
  ]

  return `<!doctype html>${renderSSR(() => (
    <Base>
      <header>
        <h1>🐣 Nitro Starter</h1>
      </header>
      <main>
        <h2>Endpoints</h2>
        <ul>
          {links.map((link) => (
            <li>
              <a href={link}>{link}</a>
            </li>
          ))}
        </ul>
      </main>
      <hr />
      <footer>
        Generated at {new Date().toUTCString()} with{' '}
        <a href="https://nitro.unjs.io" target="_blank" rel="noopener">
          Nitro
        </a>{' '}
        {useRuntimeConfig().nitroVersion}
      </footer>
    </Base>
  ))}`
})
