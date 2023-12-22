const axios = require('axios')
const cryptoCompare_marketCommand = process.env.cryptoCompare_marketCommand
const cryptoCompare_Api = process.env.cryptoCompare_Api
const {advertise} = require('../../data/message')



module.exports = (bot) => {
    bot.command(['market', '/market@Cryptowhalebot'], async ctx => {
        const input = ctx.message.text
        const inputArray = input.split(' ')
        inputArray.shift()
        const coin = inputArray.toString()
        try{
            // ambil data dari API
            const data_api = await axios(`${cryptoCompare_marketCommand}${coin}${cryptoCompare_Api}`)
    
            let market = data_api.data.Data.current
            if(market.length > 10) {
                market = market.slice(0, 10)
            }
            // memetakan Array dari data API
            let market_data = market.map(e => {
                return e.exchange
            });
            // // pengkondisian agar data yang ditampilkan hanya sampai index 10
            // let data = new_market.slice(0, 10)
            market_data = market_data.toString()
            // menghilangkan tanda koma, g dalam tulisannya maksudnya global atau menyeluruh
            const data = market_data.replace(/,/g, '\n')
    
            const pesan = `
<pre>EXCHANGE
${data}</pre>
${advertise}`
    
            ctx.replyWithHTML(pesan, {
                disable_web_page_preview: true
            })
        }catch(e) {
            if(e) return ctx.reply('That coin could not be found \nuse command /market btc\n' + advertise)
        }
    })
}