class PagamentoDao{
    constructor(){
        this._connection = require('./connection')
    }

    salva(payment, callback){
        this._connection.query("INSERT INTO pagamentos SET ?", payment, callback)
    }

    atualiza(payment, callback){
        this._connection.query("UPDATE pagamentos SET  status = ? WHERE id = ?", [payment.status, payment.id], callback)
    }

    lista(callback){
        this._connection.query("SELECT * FROM pagamentos", callback)
    }

    buscaPorId(id, callback){
        this._connection.query("SELECT * FROM pagamentos WHERE id =?",[id], callback)
    }
}

module.exports = PagamentoDao