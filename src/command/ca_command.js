const axios = require('axios')
// API endpoin dexscreener
const dexscreener = process.env.search_dexscreener
// format type data number jadi matauang
const formater = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 3, minimumFractionDigits: 0 })
const {invalidSC_message, promotBanner} = require('../../data/message')

const gaboleh =  ['/trans', '/kick', '/tran', '/ban', '/muted']



module.exports = (bot) => {
    bot.hears(/^\//, async (ctx, ) => {
        let dataInput = ctx.message.text
        let get_coin = dataInput.split('/')
        get_coin.shift()
        const coinName = get_coin.join(' ')

        // pengkondisian agar yg dimasukan tidak lebih dari satu kata
        if(dataInput.split(' ').length > 1) {
            return;
        }
        // pengkondisian terhadap kata" tertentu agar bot tidak mereply terus
        if (gaboleh.includes(dataInput)) {
            return;
          } 
    
        try{ 
            const res = await axios(`${dexscreener}${coinName}`)
    
            const data = res.data.pairs[0]
            // major data 
            const chainId = data.chainId.toUpperCase()
            const dex = data.dexId
            const chart = data.url
            // quoteToken / Pair Token
            const pair = data.quoteToken.symbol
            // Token Details
            const Name = data.baseToken.name
            const address = data.baseToken.address
            const symbol = data.baseToken.symbol
            // harga usd
            const priceUsd = data.priceUsd
            // harga untuk pair nya, seperti bnb atau ethw
            const priceNative = data.priceNative
            // marcet cap lewat fdv
            const mCap = formater.format(data.fdv)
            // price Change
            const pChange = data.priceChange
            const pm5 = pChange.m5 < 0 ? `🍎 ${pChange.m5} % ` : `🍏 ${pChange.m5} % `
            const ph1 = pChange.h1 < 0 ? `🍎 ${pChange.h1} % ` : `🍏 ${pChange.h1} % `
            const ph6 = pChange.h6 < 0 ? `🍎 ${pChange.h6} % ` : `🍏 ${pChange.h6} % `
            const ph24 = pChange.h24 < 0 ? `🍎 ${pChange.h24} % ` : `🍏 ${pChange.h24} % `
            // Liquidity
            const liquidity = data.liquidity
            const lUSD = formater.format(liquidity.usd)
            const lPair = liquidity.quote.toLocaleString('en-US') // biar ada koma di angkanya
            const lToken = liquidity.base.toLocaleString('en-US')
            // volume
            const volume = data.volume
            const vm5 = formater.format(volume.m5) > formater.format(500) ? `💵 ${formater.format(volume.m5)} ` : `💸 ${formater.format(volume.m5)} `
            const vh1 = formater.format(volume.h1) > formater.format(500) ? `💵 ${formater.format(volume.h1)} ` : `💸 ${formater.format(volume.h1)} `
            const vh6 = formater.format(volume.h6) > formater.format(500) ? `💵 ${formater.format(volume.h6)} ` : `💸 ${formater.format(volume.h6)} `
            const v1d = formater.format(volume.h24) > formater.format(500) ? `💵 ${formater.format(volume.h24)} ` : `💸 ${formater.format(volume.h24)} `
         
            const pesan = `
         
<strong>🔗Chain ID:</strong> <strong><a href="${chart}">${chainId}</a></strong>
<strong>📮Symbol : ${Name} | <a href="${chart}">${symbol}</a></strong>
<strong>🏷Price: $${priceUsd}</strong> | ${priceNative} ${pair}
<strong>📑Market: </strong><a href="${chart}">${dex}</a>

<strong>📑Contract Address:</strong>
<pre>${address}</pre>

<strong>Price Change 📈📉</strong>
<pre>5 Minute | ${pm5}  
1 Hour   | ${ph1}  
6 Hour   | ${ph6}  
1 Day    | ${ph24}
─────────────────</pre>
<strong>Volume 📊</strong>
<pre>5 Minute | ${vm5} 
1 Hour   | ${vh1}  
6 Hour   | ${vh6}  
1 Day    | ${v1d} 
─────────────────</pre>
<strong>Liquidity 🏦</strong>
<pre>USD    | ${lUSD} 💵
${pair}   | ${lPair} 💴
${symbol}   | ${lToken} 💶
─────────────────</pre>
<strong>Fully Diluted Valuation : <pre>${mCap}</pre> </strong>`
            ctx.replyWithHTML(pesan, {
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "VOIN Grub", url: 'https://t.me/VOINCryptoGrup'}, {text: "VOIN Channel", url: 'https://t.me/VoinCryptoChanneL'}],
                        [{text: "Chart 📉📈", url: chart}]
                    ],
                    resize_keyboard: true
                }
            })
        } catch(e) {
            if (e) {
                return ctx.replyWithHTML(invalidSC_message, {
                    disable_web_page_preview: true
                })
            }
        }
    })
}