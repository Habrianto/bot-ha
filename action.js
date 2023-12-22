const { Telegraf } = require('telegraf')
const config = require('./config.json')
const bot = new Telegraf(config.BOT_TOKEN)
const {help} = require('./functions')



// action setoran
const bot.action('setoran', ctx => {
    ctx.reply('succes')
})

