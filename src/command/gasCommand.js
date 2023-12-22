const axios = require('axios')
const gas_Api = process.env.apiGas
const gasCommand = ['gas', '/gas@Cryptowhalebot', '/gas@BitHargaBot']
const {promotBanner, advertise} = require('../../data/message')

module.exports = (bot) => {
   bot.command(gasCommand, async (ctx) => {
       try{
          // Get API from EtherScan
        const gasApi = await axios(gas_Api)
        const gas = gasApi.data.result
        const gasSlow = Math.ceil(gas.suggestBaseFee)
        const gasSafe = Math.ceil(gas.SafeGasPrice)
        const gasFast = Math.ceil(gas.FastGasPrice)
        const average = Math.ceil(gas.ProposeGasPrice)
    
        const pesan = `
⛽<strong>Ethereum Gas Prices</strong>
🐢 Slow: ${gasSlow}
🚗 Safe: ${gasSafe}
✈ Average: ${average}
🚀 Fast: ${gasFast}
<a href="https://ethgasstation.info/">Eth Gas Station</a>
${advertise}`
    
        ctx.replyWithHTML(pesan, {
          disable_web_page_preview: true
      })
      } catch(e) {
        if (e) {
          ctx.reply('Something Wrong')
        }
      }
  })
}
