export default defineEventHandler(() => {
  const links = [
    '/stream',
    '/shikiji',
    '/api/hello',
    '/api/validate/body',
    '/api/validate/query?user=nitro',
    '/api/error',
  ]

  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Nitro Starter</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
        />
      </head>

      <body>
        <header>
          <h1>🐣 Nitro Starter</h1>
        </header>
        <main>
          <h2>Endpoints</h2>
          <ul>
            ${links
              .map((link) => `<li><a href="${link}">${link}</a></li>`)
              .join('\n')}
          </ul>
          <br />
          <h2>Performance</h2>
          <table class="table-auto" id="perf"></table>
          <hr />
          <footer>
            Generated at ${new Date().toUTCString()} with
            <a href="https://nitro.unjs.io/" target="_blank" rel="noopener"
              >Nitro</a
            >@${useRuntimeConfig().nitroVersion} (<a
              href="https://github.com/unjs/nitro"
              target="_blank"
              rel="noopener"
              >source code</a
            >)
          </footer>
        </main>
        <script>
          const timing = window.performance.timing
          const measures = {
            'Connection time:': timing.connectEnd - timing.connectStart,
            'DNS lookup:': timing.domainLookupEnd - timing.domainLookupStart,
            'TTFB:': timing.responseStart - timing.requestStart,
            Response: timing.responseEnd - timing.responseStart,
          }
          document.querySelector('#perf').innerHTML = Object.entries(measures)
            .map(
              ([name, value]) =>
                '<tr><td>' + name + '</td><td>' + value + 'ms</td></tr>',
            )
            .join('')
        </script>
      </body>
    </html>
  `.trimStart()
})
