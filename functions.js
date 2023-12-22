const { Telegraf } = require('telegraf')
const config = require('./config.json')
const bot = new Telegraf(config.BOT_TOKEN)
const { tolong } = require('./template')


// reply ketika tombol Help di klik
exports.buttonHelp = (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, tolong, {reply_markup:{
       inline_keyboard:[
          [
             {text: 'Setoran', callback_data: 'setoran'},
             {text: 'Setoran', callback_data: 'setoran'},
          ],
          [
             {text: 'Penukaran', callback_data: 'setoran'},
             {text: 'Pembelian', callback_data: 'setoran'},
          ],
          [
             {text: 'Mengirim Tip', callback_data: 'setoran'},
             {text: 'Mengrim Airdrop', callback_data: 'setoran'},
          ],
          [
             {text: 'Sistem Afiliasi', callback_data: 'setoran'},
             {text: 'Info Lebih Lanjut', callback_data: 'setoran'},
          ],
          [
             {text: 'Komunitas', url: 'https://t.me/+Pja0vRzsoKRlNzY1'},
             {text: 'Tambah Ke Grub', callback_data: 'setoran'},
          ],
       ]
    }})
 };
 

exports.actionSetoran = bot.action('setoran', (ctx) => {
   ctx.reply("lohas")
})

// module.exports ={ help }





