// @ts-check
import { createNitro, writeTypes } from 'nitropack'

export async function prepare({ rootDir = process.cwd() } = {}) {
  const nitro = await createNitro({ rootDir })
  await writeTypes(nitro)
}

prepare().catch(console.error)
