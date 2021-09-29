class NotFound extends Error{
    constructor(message){
        super(message||'Fornecedor não foi encontrado!')
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound