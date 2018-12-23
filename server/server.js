const fetch = require('node-fetch')
const cors = require('cors')
const app = require('express')();

const { apiKey } = require('../constants')

let iExecPrice

iExecPriceGet()

app.use(cors());
app.options('*', cors());

app.get('/price/:currency', (req, res) => {
  let currency = req.params.currency.toUpperCase()
  iExecTo(currency).then(price => {
    res.send({ price: price.toString() })
  })
})
function iExecTo(currency) {
  if (!iExecPrice) { return iExecPriceGet().then(price => {
    if (currency === 'USD') return price
  }) } else {
    console.log(iExecPrice)
    return iExecPrice
  }
}

function iExecPriceGet() {
  let baseUrlCMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1637&CMC_PRO_API_KEY=${apiKey}`
  return fetch(baseUrlCMC).then(response => {
    return response.json()
  }).then(json => {
    const iExecPriceValid = json.data[1637].quote.USD.price
    if (!Number.isNaN(iExecPriceValid)) {
      return iExecPriceValid
    }
    else throw new Error({message: 'Coinmarketcap returned an invalid price'})
  }).catch(error => {
    console.error(error)
  })
}

app.listen(3008)

console.log(iExecTo('USD').then(price => console.log(price)))
















/** function getId() {
  let baseUrlCMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?symbol=RLC&CMC_PRO_API_KEY=${apiKey}`
  fetch(baseUrlCMC).then(response => {
    console.log(response)
    return response.json()
  }).then(json => console.log(json.data)).catch(error => {
    console.error(error)
  })
}
*/
