export default defineEventHandler((event) => {
  const { allowedOrigins: origin = [] } = useRuntimeConfig()
  handleCors(event, { origin })
})
