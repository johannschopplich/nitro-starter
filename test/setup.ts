import { setupContext, startServer } from './utils'

// Setup shared Nitro instance
// See https://vitest.dev/config/#globalsetup
export default async function () {
  const ctx = await setupContext()

  // Start the server before all tests
  const close = await startServer(ctx)

  // Global setup is run in a different global scope, so tests don't have
  // access to variables defined here. We need to expose the server URL to
  // tests by assigning it to a process.env variable.
  process.env.NITRO_SERVER_URL = ctx.server!.url

  return async function () {
    // Close the server after all tests
    await close()
  }
}
