export default defineEventHandler((event) => {
  const { param } = getRouterParams(event)
  return param
})
