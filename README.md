# Nitro Starter

Starter kit for [⚗️ Nitro](https://nitro.unjs.io) – a powerful tool chain and a runtime framework from the [UnJS](https://github.com/unjs) ecosystem to build and deploy any JavaScript server, anywhere.

It is highly recommended reading the [Nitro documentation](https://nitro.unjs.io) when working with this template.

## Key Features

- 🎒 [Demo routes](./server/routes/api/) and [route rule examples](./server/nitro.config.ts)
- 🥖 [Nano JSX](https://nanojsx.io) SSR routes
- 🤠 [CORS handler middleware](./server/middleware/cors.ts)
- ✅ Full test coverage powered by [Nitro Test Utils](https://github.com/johannschopplich/nitro-test-utils)
- 🦺 ESLint & Prettier defaults

## Usage

### Prerequisites

1. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
2. Install dependencies using `pnpm install`

### Development

1. Start the development server using `pnpm run dev`
2. Visit [localhost:3000](http://localhost:3000/)

### Testing

Nitro tests are located in the [`test`](./test) directory. When running tests, a Nitro instance is created and launched for all test suites. This can be configured based on your use case.

Run the Nitro tests using `pnpm test`.

## License

[MIT](./LICENSE) License © 2022-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
