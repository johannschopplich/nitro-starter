import { h, renderSSR } from 'nano-jsx'
import { Base } from '~/components/index.tsx'

export default defineEventHandler(() => {
  const links = [
    '/stream',
    '/api/hello',
    '/api/validate/body',
    '/api/validate/query?user=nitro',
    '/api/error',
  ]

  return renderSSR(() => (
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
        <br />
        <h2>Performance</h2>
        <table class="table-auto" id="perf"></table>
        <hr />
        <footer>
          Generated at {new Date().toUTCString()} with{' '}
          <a href="https://nitro.unjs.io/" target="_blank" rel="noopener">
            Nitro
          </a>{' '}
          {useRuntimeConfig().nitroVersion} (
          <a
            href="https://github.com/unjs/nitro"
            target="_blank"
            rel="noopener"
          >
            source code
          </a>
          )
        </footer>
      </main>
    </Base>
  ))
})
