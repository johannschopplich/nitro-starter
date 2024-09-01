export default defineEventHandler((event) => {
  const {
    cors: { origins = [] },
  } = useRuntimeConfig()

  // Allow requests from the development server
  if (import.meta.dev) {
    const origin = getRequestHeader(event, 'origin')
    origins.push(origin)
  }

  handleCors(event, {
    origin: origins,
    methods: ['GET', 'POST', 'OPTIONS'],
    maxAge: '86400',
  })
})
