export default defineEventHandler((event) => {
  const {
    cors: { origins = [] },
  } = useRuntimeConfig(event)
  const origin = getRequestHeader(event, 'origin')

  handleCors(event, {
    origin: [
      ...origins,
      // Allow requests from the development server
      ...(import.meta.dev ? [origin] : []),
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    maxAge: '86400',
  })
})
