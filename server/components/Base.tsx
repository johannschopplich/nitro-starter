import type { Component } from 'nano-jsx'
import { h } from 'nano-jsx'

export const Base = ({ children }: { children: Component[] }) => {
  const scriptContent = `
const timing = window.performance.timing
const measures = {
  'Connection time:': timing.connectEnd - timing.connectStart,
  'DNS lookup:': timing.domainLookupEnd - timing.domainLookupStart,
  'TTFB:': timing.responseStart - timing.requestStart,
  Response: timing.responseEnd - timing.responseStart,
}
document.querySelector('#perf').innerHTML = Object.entries(measures)
  .map(([name, value]) => '<tr><td>' + name + '</td><td>' + value + 'ms</td></tr>')
  .join('')
`

  return (
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
        {children}

        <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      </body>
    </html>
  )
}
