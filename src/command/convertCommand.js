const axios = require('axios')
const {promotBanner, advertise, error_convert} = require('../../data/message')
const convert_Compare = process.env.convert_Compare
const convert_API = process.env.convert_API


module.exports = (bot) => {
    bot.command('/convert',async ctx => {
        const input = ctx.message.text
        const inputArray = input.split(' ')
        // ini buat ngambil input dari user
        const jumlah = Number(inputArray[1])
        const coin = inputArray[2]
        const fiat = inputArray[3]
        // catch API
        try {
            // field coin name
            const list = await axios(`${convert_Compare}${coin},${fiat}&tsyms=USD&%26api_key%3D=${convert_API}`)
            const data = list.data
            const listArray = Object.entries(data)
            // data coin input pertama
            const first = listArray[0]
            const coin1 = first[1].USD
            // data coin input kedua
            const second = listArray[1]
            const coin2 = second[1].USD
            // operation logic and convert
            // rumusnya = harga coin1 / harga coin2 * jumlah => untuk convert antar coin
            const result = coin1 / coin2 * jumlah
            // field for text
            const result_coin = coin.toUpperCase()
            const result_fiat = fiat.toUpperCase()
            const amount = jumlah.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })
            const results = result.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })
    
const pesan = `
🔹<strong> Live Convert</strong>
<a href="https://t.me/AsbakCrypto_Bot">${amount} ${result_coin} = ${results} ${result_fiat}</a>
${advertise}
`
        ctx.replyWithHTML(pesan, {
            disable_web_page_preview: true
        })
        } catch(e) {
            if (e) {
                ctx.replyWithHTML(error_convert, {
                    disable_web_page_preview: true
                })
            }
        }
    })
}