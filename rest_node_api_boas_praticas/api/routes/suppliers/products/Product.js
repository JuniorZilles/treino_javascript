const Table = require('./TableProduct');

class Product{
constructor({id, title, price, qtd, supplier, createdAt, updatedAt, version}){
    this.id = id
    this.titulo = title
    this.preco = price
    this.estoque = qtd
    this.supplier = supplier
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.version = version
    }

    async create(){
        const result = await Table.insert({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            supplier: this.supplier
        })

        this.id = result.id;
        this.updatedAt = result.updatedAt;
        this.createdAt = result.createdAt;
        this.version = result.version;
    }
}

module.exports = Product;