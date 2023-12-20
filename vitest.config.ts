import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    isolate: false,
    globalSetup: ['./test/setup.ts'],
  },
})
