const axios = require('axios')
const coins_cg = process.env.coinCg
const info_cg = process.env.coinInfo
const {advertise, promotBanner} = require('../../data/message')

module.exports = (bot) => {
    bot.command('atl', async ctx => {
        const input = ctx.message.text
        const inputArray = input.split(' ')
        const symbolCoin = inputArray[1].toUpperCase()
        try{
            // mencari id coin berdasarkan symbol
            const cg = await axios(`${coins_cg}${symbolCoin}`)
            const cg1 = cg.data.coins
            const phase = []
            cg1.forEach(async e => {
                if(symbolCoin == e.symbol){
                    phase.push(e.id)
                } 
            });
            const coin = phase[0]
            // mendapatkan informasi coin => ATH dan info seputar ATH 
            const cgInfo = await axios(`${info_cg}${coin}`)
            const current_price = cgInfo.data.market_data.current_price.usd
            const atl = cgInfo.data.market_data.atl.usd
            const atlDate = cgInfo.data.market_data.atl_date.usd.split('T')[0]
            const presentase = cgInfo.data.market_data.atl_change_percentage.usd
            let date_info = new Date(atlDate).toLocaleDateString('id')
            const date = date_info.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g ,'-') // merubah tanda pemisah dari sebelumnya tanda slash / menjadi tanda -

            // merubah nama coin menjadi kapital pada huruf pertamanya
            const name_coin = cgInfo.data.localization.en

            const pesan = `
${promotBanner}<pre>${name_coin}
ATL Date      : ${date} 
Current Price : $ ${current_price}
ATL Price     : $ ${atl}
% from ATL    : ${presentase} %</pre>
${advertise}`
            ctx.replyWithHTML(pesan, {
                disable_web_page_preview: true
            })
        }catch(e) {
            ctx.reply(`${inputArray[1]} could not be found \nFollow 👉 @Asbakventures📰`)
        }
    })
}