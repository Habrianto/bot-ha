const promotBanner = `<a href="https://raw.githubusercontent.com/Habrianto/-628ndjskwlwouhbeudis/main/dummy2jpg.jpg"> </a>`

const advertise = `
👉 Join @VOINCryptoGrup 📰`



const eror_message = `
${promotBanner}That coin could not be found
if you are looking for a token that has not been listed on the CEX market, use a command like the one below to find data about the token
example: /cake
${advertise}
`

const invalidSC_message = `
<strong>Sorry :( Something Wrong 
Use a command like the one below to find the token you want
example: /cake</strong>
${advertise}
`

const start_message = `
<a href="https://t.me/VOINCryptoGrup">Welcome to Voin Crypto Bot</a>
to see all command you can type /help
join our grub @VOINCryptoGrup
`

const help_message = `
*Command List*

*/p <symbol coins>*  | to track crypto prices

*/<coin name>* |  to track tokens that have not been listed on the centralized market(CEX), example : /cake

*/gas*  | to check ethereum gas prices 

*/calc <coin> <amount>* | to calculate the price of the number of cryptocurrency coins

*/convert <amount> <coin1> <coin2>* | calculates the price as well as a comparison of 2 coin crypto currency or fiat currency

*/makrket <coin>* | Find where you can buy coin

*/ath <coin>* | get All time High price of the coin

*/atl <coin>* | get All time low price of the coin`

const calc_error = `
${promotBanner}That Coin should not be found    
Here's an Example
/calc btc 100
${advertise}`

const error_convert = `
<b>Sorry :(</b> 
there is something wrong in your input, make sure you enter the input correctly 
example 
/convert 100 btc usd 
${advertise}`



module.exports = { eror_message, invalidSC_message, start_message, help_message, calc_error, advertise, promotBanner, error_convert}