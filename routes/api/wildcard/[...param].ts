export default eventHandler((event) => {
  return event.context.params.param as string
})
