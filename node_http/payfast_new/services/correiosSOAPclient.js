const soap = require('soap')

class CorreiosClient {
  constructor () {
      this._url ='https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
  }

  calculaPrazo(data, callback){
    soap.createClient(
      this._url,
      (erro, client) => {
        console.log('Soap Created')
        client.CalcPrazo(
          data,
          callback
        )
      }
    )
  }
}
module.exports = CorreiosClient
