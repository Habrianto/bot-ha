require('dotenv').config()
const  {Telegraf}  = require('telegraf')
const bot = new Telegraf(process.env.telegram)
const {start_message, help_message} = require('./data/message')

// start command
bot.start(ctx => {ctx.replyWithHTML(start_message, {
   disable_web_page_preview: true
})})
// help command
bot.help(ctx => {ctx.replyWithMarkdown(help_message, {
   disable_web_page_preview: true
})})
//  /p command
const p_command = require('./src/command/pCommand')
p_command(bot)
// /gas command
const gas_command = require('./src/command/gasCommand')
gas_command(bot)
// /calc command
const calc_command = require('./src/command/calcCommand')
calc_command(bot)
// /convert Command
const convert_command = require('./src/command/convertCommand')
convert_command(bot)
// /market command
const market_command = require('./src/command/marketCommand')
market_command(bot)
// /ATH Command
const ath_command = require('./src/command/athCommand')
ath_command(bot)
// /ATL Command
const atl_command = require('./src/command/atlCommand')
atl_command(bot)


// /ca command => mencari token dex perintah nya seperti /cake
const caCommand = require('./src/command/ca_command')
caCommand(bot)














bot.launch()
// exports.handler = async (event, context, callback) => {
//    const tmp = JSON.parse(event.body)
//    bot.handleUpdate(tmp)
//    return callback(null, {
//       statusCode: 200,
//       body: '',
//    });
// };