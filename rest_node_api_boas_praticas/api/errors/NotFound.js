class NotFound extends Error{
    constructor(nome){
        super(`${nome} não foi encontrado!`)
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound