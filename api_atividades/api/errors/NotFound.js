class NotFound extends Error{
    constructor(){
        super('Usuário não encontrado')
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound