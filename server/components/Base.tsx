import type { Component } from 'nano-jsx'
import { h } from 'nano-jsx'

export const Base = ({
  title,
  children,
}: {
  title?: string
  children: Component[]
}) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>{title || 'Nitro Starter'}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
        />
      </head>

      <body>{children}</body>
    </html>
  )
}
