class EmptyField extends Error{
    constructor(field){
        super(`O campo "${field}" está vazio'`)
        this.name = 'EmptyField'
        this.idError = 0
    }
}

module.exports = EmptyField