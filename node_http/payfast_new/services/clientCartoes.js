const restify = require('restify')
class CartaoClient{
    constructor(){
        this._client = restify.createJsonClient({
            url: 'http://localhost:3001'
        })
    }
    autoriza(cartao, callback){
        this._client.post('/cartoes/autoriza', cartao, callback)
    }

}
module.exports = CartaoClient