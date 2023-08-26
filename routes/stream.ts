export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')

  const encoder = new TextEncoder()
  const _html = html`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Nitro Streaming Demo</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
        />
      </head>
      <body>
        <header>
          <h1>Nitro Streaming Demo</h1>
          <a
            href="https://github.com/johannschopplich/nitro-starter/blob/main/routes/stream.ts"
          >
            Source Code</a
          >
        </header>
        <main></main>
      <!-- </body> -->
    </html>
  `.trimStart()

  const stream = new ReadableStream({
    async start(controller) {
      const write = (chunk: string) => {
        controller.enqueue(encoder.encode(chunk))
      }

      write(_html)

      const text =
        'Nitro, an open source TypeScript framework, empowers you to create web servers that run anywhere, offering a range of impressive features such as rapid development through a zero config setup with hot module replacement for server code in development, a versatile deployment capability that allows for codebase deployment to any provider without extra configuration, and a portable and compact design, effectively eliminating the need for "node_modules" with an output size of less than 1MB. Its filesystem routing feature automatically registers server and API routes, while maintaining a minimal design to fit into any solution with minimum overhead. The framework supports asynchronous chunk loading via code-splitting for a fast server startup time and response. Inherent TypeScript support is provided with several additional enhancements. Nitro also offers a multi-driver, platform-agnostic storage system, a powerful built-in caching API, and is highly customizable through its plugins hooks system. It further enhances code clarity with an auto imports feature, which automatically imports utilities for a minimal and clean codebase, adding only the used ones to the final bundle. Remarkably, Nitro maintains backward compatibility, enabling the use of legacy npm packages, CommonJS, and mocking Node.js modules for workers. This engine, openly powering Nuxt, is accessible to all, paving the way for a versatile and user-friendly web server development experience.'

      for (const token of text.split(' ')) {
        write(token + ' ')
        await waitFor(50)
      }

      controller.close()
    },
  })

  return stream
})

function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
