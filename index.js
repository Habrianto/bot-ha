const { Telegraf } = require('telegraf')
const config = require('./config.json')
const { Extra, Markup } = Telegraf
// const session = require('telegraf/session')
// const Stage = require('telegraf/stage')
// const Scene = require('telegraf/scenes/base')
const bot = new Telegraf(config.BOT_TOKEN)
const {wd, deposit, pulsa, referal, linkRef, convert, bonus, tolong} = require('./template')
const help = require('./functions')



// keyboard di telegraf
bot.command('/start', ctx => {
   const username = ctx.message.from.username
   const start = `
Hi ${username}

Paybot merupakan bot di Telegram
yang mendukung penukaran Crypto dari 
dan ke rupiah secara cepat dan praktis`

   bot.telegram.sendMessage(ctx.chat.id, start, {
   reply_markup: {
      keyboard: [
         ['📝Deposit', '💰Wallet', '💸Withdraw'],
         ['🔄Convert', '📲Pulsa', '👨‍👧‍👧Referral'],
         ['🎁Bonus', '📊History', '🙋‍♀️Help'],
         ['🔔Event'],
      ],
      // ubah ukuran keyboard menjadi langsing
      resize_keyboard: true
      // one time keyboard, begitu keyboard nya ditekan langsung hilang
      // one_time_keyboard: false
      }
   })
})


// Reply Tombol
bot.hears('📝Deposit', ctx => {
   ctx.telegram.sendMessage(ctx.chat.id, deposit,{
      reply_markup:{
         inline_keyboard:[
            [
               {text: 'BNB', callback_data: "BNB"},
               {text: 'XLM', callback_data: "XLM"},
               {text: 'TRX', callback_data: "TRX"}
            ],
            [
               {text: 'BUSD', callback_data: "BNB"},
               {text: 'USDT', callback_data: "USDT"},
               {text: 'BIDR', callback_data: "BNB"}
            ]
         ]
      }
   })
});

// reply ketike tombol wallet
bot.hears('💸Withdraw', (ctx) => {
   ctx.telegram.sendMessage(ctx.chat.id, wd)
});



// Reply ketika wallet di klik
bot.hears('💰Wallet', (ctx) => ctx.reply(`
Rincian wallet anda
Rabu, 16 November 2022 | 21:30:47

┌┌ Rupiah (IDR)
├└ Saldo: 0
├┌ BNB (BEP20)
├└ Saldo: 0
├┌ BUSD (BEP20)
├└ Saldo: 0
├┌ TRON (TRX)
├└ Saldo: 0
├┌ USDT (TRC20)
├└ Saldo: 0
├┌ SOL (SOLANA)
└└ Saldo: 0
`));


// reply ketika tombol convert di klik
bot.hears('🔄Convert', (ctx) => ctx.reply(convert));

bot.hears('📲Pulsa', (ctx) => {
   ctx.telegram.sendMessage(ctx.chat.id, pulsa, {
      reply_markup:{
         inline_keyboard:[
            [{text: 'Pulsa Seluler', callback_data: 'pulsa seluler'}, {text: 'Token Listrik', callback_data: 'Token listrik'}],
            [{text: 'Riwayat Transaksi', callback_data: 'Riwayat pulsa'}]
         ]
      }
   })
});


// reply ketika tombol referral di klik
bot.hears('👨‍👧‍👧Referral', (ctx) => {
   ctx.reply(referal)
   ctx.telegram.sendMessage(ctx.chat.id, linkRef, {reply_markup:{
      inline_keyboard:[[{text: 'Bagikan Sekarang', url: 'https://t.me/TsukaPowETHWPORTAL'}]]
   }})
});


// reply ketika bonus di klik
bot.hears('🎁Bonus', (ctx) => {
   ctx.reply(bonus)
   ctx.telegram.sendMessage(ctx.chat.id, `Total Transaksi Anda Minggu Ini:
   IDR 0,-
   
   *Maaf*! Anda belum berkesempatan mendapatkan bonus mingguan, tingkatkan terus transaksi anda.
   
   Pengundian dilakukan setiap hari minggu jam 12 siang. Daftar pemenang minggu sebelumnya lihat disini: https://t.me/Mahachanger/139081`, {parse_mode: 'MarkdownV2'})
});


// reply ketika tombol History di klik
bot.hears('📊History', (ctx) => {
   ctx.telegram.sendMessage(ctx.chat.id, 'Riwayat Transaksi Anda. Hanya menampilkan 20 transaksi terbaru', {
      reply_markup:{inline_keyboard:[
      [{text: "Deposit Rupiah", callback_data: "deposit rupiah"},
      {text: 'Withdraw Rupiah', callback_data: 'Withdraw Rupiah'}],
      [{text: 'Convert Crypto', callback_data: 'convert history'}]
      ]}
   })
});


// action Help
bot.hears('🙋‍♀️Help', help.buttonHelp)
bot.action('setoran', help.actionSetoran)

// reply ketika inlinw Kyeboard Setoran di Klik
// bot.action('setoran', (ctx) => {
//    ctx.reply("lohas")
// })











// bot.hears('setoran', ctx => ctx.reply('loga'))













// bot.hears('Credits', ctx => {
//    bot.telegram.sendMessage(ctx.chat.id, 'Pilih Salah Satu', {
//       reply_markup: {
//          inline_keyboard: [[{text: 'buy'}]]
//       }}
//    )
// })

// bot.use('/help', ctx => ctx.replyWithMarkdown(`Hello *world*`))







// bot.context.db = {
//    getScores: () => {
//       return 42
//    }
// }

// bot.on('text', ctx => {
//    const scores = ctx.db.getScores(ctx.message.from.username)
//    return ctx.reply(`${ctx.message.from.username}: ${scores}`)
// })
// const greeter = new Scene('greeter')
// greeter.enter(ctx => ctx.reply('helo'))
// greeter.hears(/hi/gi, leave())

// // bot.start((ctx) => ctx.reply('Welcome'));
// // bot.help((ctx) => ctx.reply('Send me a sticker'));
// // bot.on('sticker', (ctx) => ctx.reply('👍'));







bot.launch()