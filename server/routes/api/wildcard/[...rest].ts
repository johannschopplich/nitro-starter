export default defineEventHandler((event) => {
  const { rest } = getRouterParams(event)
  return rest
})
