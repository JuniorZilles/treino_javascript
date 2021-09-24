class NoData extends Error{
    constructor(){
        super('Não foram fornecidos dados para atualizar')
        this.name = 'NoData'
        this.idError = 2
    }
}

module.exports = NoData