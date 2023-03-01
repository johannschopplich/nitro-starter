/**
 * @remarks
 * Tip: Use the `lit-html` VSCode extension to get syntax highlighting
 */
export function html(...args: Parameters<typeof String.raw>) {
  return String.raw(...args)
}
