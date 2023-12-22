const axios = require('axios')
const formater = new Intl.NumberFormat('en-US', {maximumFractionDigits: 3, minimumFractionDigits: 0})
// API
const info_cg = process.env.coinInfo
const coins_cg = process.env.coinCg
const {calc_error, advertise, promotBanner} = require('../../data/message')

module.exports = (bot) => {
    bot.command('calc', async ctx => {
        const input = ctx.message.text
        let inputArray = input.split(' ')
        
        if(inputArray.length < 3) {
            ctx.replyWithHTML(calc_error, { disable_web_page_preview: true })
            return;
        } 
        else {
        // hasil logic  Array
        const symbolCoin = inputArray[1]
        const jumlah = Number(inputArray[2])
    
        try{
            // search coin with symbol
            const cg = await axios(`${coins_cg}${symbolCoin}`)
            const cg1 = cg.data.coins
            const phase = []
            cg1.forEach( e => {
                if(symbolCoin.toUpperCase() == e.symbol){
                    phase.push(e.id)
                } 
            });
            const coin = phase[0]
            // displays coins information
            const cgInfo = await axios(`${info_cg}${coin}`)
            const symbol = cgInfo.data.symbol.toUpperCase()
            let price_fiat = cgInfo.data.market_data.current_price.usd
            let price_btc = cgInfo.data.market_data.current_price.btc
            let price_eth = cgInfo.data.market_data.current_price.eth
            let price_bnb = cgInfo.data.market_data.current_price.bnb
            let price_idr = cgInfo.data.market_data.current_price.idr
            const d1 = formater.format(cgInfo.data.market_data.price_change_percentage_24h_in_currency.usd)
            const h1 = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.usd)
            const d1Btc = formater.format(cgInfo.data.market_data.price_change_percentage_24h_in_currency.btc)
            const h1Btc = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.btc)
            const d1Eth = formater.format(cgInfo.data.market_data.price_change_percentage_24h_in_currency.eth)
            const h1Eth = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.eth)
            const d1Bnb = formater.format(cgInfo.data.market_data.price_change_percentage_24h_in_currency.bnb)
            const h1Bnb = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.bnb)
            const d1Idr = formater.format(cgInfo.data.market_data.price_change_percentage_24h_in_currency.idr)
            const h1Idr = formater.format(cgInfo.data.market_data.price_change_percentage_1h_in_currency.idr)
            
            const priceFiat = cgInfo.data.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 })
            // logic Math
            let usd = jumlah < 0 ? price_fiat / jumlah : price_fiat * jumlah 
            let btc = jumlah < 0 ? price_btc / jumlah : price_btc * jumlah
            let eth = jumlah < 0 ? price_eth / jumlah : price_eth * jumlah 
            let bnb = jumlah < 0 ? price_bnb / jumlah : price_bnb * jumlah 
            let idr = jumlah < 0 ? price_idr / jumlah : price_idr * jumlah 
            // symbol price with icon
            const btc_price = btc+' BTC'
            const usd_price = usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 0 })+ ' USD'
            const eth_price = eth + ' ETH'
            const bnb_price = bnb + ' BNB'
            const idr_price = idr.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })+' IDR'
            
            
const pesan = `
🧮 Calculating ${symbol} ${jumlah}                 
<pre>Current Price : ${priceFiat}</pre>
💵 ${usd_price}
<pre>H1: ${h1} % | D1: ${d1} %</pre>
Rp. ${idr_price}
<pre>H1: ${h1Idr} % | D1: ${d1Idr} %</pre>
₿ ${btc_price}
<pre>H1: ${h1Btc} % | D1: ${d1Btc} %</pre>
`
          ctx.replyWithHTML(pesan, {
            disable_web_page_preview: false
        })  
    
            
        } catch(e) {
            if(e){
                ctx.replyWithHTML(calc_error, {
                    disable_web_page_preview: true
                })
            }
        }
    } 
})
}