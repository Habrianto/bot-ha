const axios = require('axios')
const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 3, minimumFractionDigits: 0 })
// API
const coins_cg = process.env.coinCg
const info_cg = process.env.coinInfo
const priceCommand = ['p', '/p@Cryptowhalebot', '/p@BitHargaBot']
const {eror_message, advertise, promotBanner} = require('../../data/message')

module.exports = (bot) => {
    bot.command(priceCommand, async (ctx) => {
    const input = ctx.message.text
    let inputArray = input.split(' ')
   
   if(inputArray.length == 1){
        inputArray.push('btc')
   } else if(inputArray.length > 2) {
        ctx.replyWithHTML(eror_message)
        return false
   } 
   const symbolCoin = inputArray[1].toUpperCase()
    //sc = inputArray.join(' ')
   try{
       // search coin with symbol
        const cg = await axios(`${coins_cg}${symbolCoin}`)
        const cg1 = cg.data.coins
        const phase = []
        cg1.forEach(async e => {
            if(symbolCoin == e.symbol){
                phase.push(e.id)
            } 
        });
        const coin = phase[0]
        // console.log(coin)
            // displays coins information
            const cgInfo = await axios(`${info_cg}${coin}`)
            const nama = coin.toUpperCase()
            const symbol = cgInfo.data.symbol.toUpperCase()
            const price_fiat = cgInfo.data.market_data.current_price.usd.toLocaleString('en-US', {maximumFractionDigits: 4, minimumFractionDigits: 0 })
            const price_btc = cgInfo.data.market_data.current_price.btc + '₿'
            const ath = '$ '+ cgInfo.data.market_data.ath.usd.toLocaleString('en-US', {maximumFractionDigits: 4, minimumFractionDigits: 0 })
            const athDate = cgInfo.data.market_data.ath_date.usd.split('T')[0]
            const atl = '$ '+ cgInfo.data.market_data.atl.usd.toLocaleString('en-US', {maximumFractionDigits: 4, minimumFractionDigits: 0 })
            const atlDate = cgInfo.data.market_data.atl_date.usd.split('T')[0]
            const mc = '$ '+ cgInfo.data.market_data.market_cap.usd.toLocaleString('en-US', {maximumFractionDigits: 4, minimumFractionDigits: 0 })
            const volume = '$ '+ cgInfo.data.market_data.total_volume.usd.toLocaleString('en-US', {maximumFractionDigits: 4, minimumFractionDigits: 0 })
            const rank = cgInfo.data.market_data.market_cap_rank === null ? '⏳' : `${cgInfo.data.market_data.market_cap_rank}`
            const h1 = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.usd) < 0 ? `🍎 ${formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.usd)}` : `🍏 ${formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.usd)}`
            const d1 = cgInfo.data.market_data.price_change_percentage_24h < 0 ? `🍎 ${cgInfo.data.market_data.price_change_percentage_24h}` : `🍏 ${cgInfo.data.market_data.price_change_percentage_24h}`
            const d7 = cgInfo.data.market_data.price_change_percentage_7d < 0 ? `🍎 ${cgInfo.data.market_data.price_change_percentage_7d}` : `🍏 ${cgInfo.data.market_data.price_change_percentage_7d}`
     
            const message = `
            
${promotBanner}<a href="https://www.coingecko.com/id/koin_koin/${coin}">${symbol}</a> | <strong>${nama}</strong>
<pre>$${price_fiat}<strong> | </strong>${price_btc}</pre>
<strong>📎Rank : <a href="https://www.coingecko.com/id/koin_koin/${coin}">${rank}</a></strong>
─────────────────
📊 Price Change 📊
<pre>1 Hour | ${h1} % 
1 Day  | ${d1} %
7 Day  | ${d7} % </pre>
─────────────────
<strong>📈 All Time High | Low 📉</strong> 
<pre>ATH | ${ath}
ATL | ${atl}  </pre>
─────────────────
<pre><strong>MCap   | ${mc} </strong>
<strong>Volume | ${volume}</strong></pre>`
        

     ctx.sendMessage(message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
    })

        // ctx.replyWithHTML(message, {
        //     disable_web_page_preview: true
        // })
        } catch(e) {
            if(e){
                ctx.replyWithHTML(eror_message, {
                    disable_web_page_preview: true
                })
            }
        }
    })
}
