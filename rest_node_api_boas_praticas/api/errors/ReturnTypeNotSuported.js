class ReturnTypeNotSuported extends Error{
    constructor(contenType){
        super(`O tipo de conteúdo ${contenType} não é suportado`)
        this.name = 'ReturnTypeNotSuported'
        this.idError = 3
    }
}

module.exports = ReturnTypeNotSuported