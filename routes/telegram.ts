import { Telegraf } from 'telegraf'

const { BOT_TOKEN, BOT_SECRET } = process.env

export default defineCachedEventHandler(async (event) => {
  const host =
    getRequestHeader(event, 'x-forwarded-host') || getRequestHost(event)
  const webhookUrl = `https://${host}/telegram-hook?secret_hash=${BOT_SECRET}`
  const query = getQuery(event)
  const bot = new Telegraf(BOT_TOKEN!)

  bot.start((ctx) => ctx.reply('Welcome!'))
  bot.help((ctx) => ctx.reply('Help text...'))

  if (query.setWebhook === 'true') {
    const isSet = await bot.telegram.setWebhook(webhookUrl)
    const info = await bot.telegram.getWebhookInfo()
    return `Webhook set to ${webhookUrl}: ${isSet}<br>${JSON.stringify(info)}`
  } else if (query.secret_hash === BOT_SECRET) {
    const body = await readBody(event)
    await bot.handleUpdate(body)
  }

  return 'Forbidden'
})
