const Table = require('./TableProduct');
const InvalidField = require('../../../errors/InvalidField')
const NoData = require('../../../errors/NoData')


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
        this.validate();
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

    validate(){        
        if(typeof this.titulo !== 'string' || this.titulo.length === 0){
            throw new InvalidField('titulo')                
        }
        if(typeof this.preco !== 'number' || this.preco === 0){
            throw new InvalidField('preco') 
        }        
    }

    delete(){
        return Table.delete(this.id, this.supplier);
    }

    async getProduct(){
        const prod = await Table.getById(this.id, this.supplier);

        this.titulo = prod.titulo;
        this.preco = prod.preco;
        this.estoque = prod.estoque;
        this.createdAt = prod.createdAt;
        this.updatedAt = prod.updatedAt;
        this.version = prod.version;
    }

    update(){
        const updateData = {}

        if(typeof this.titulo === 'string' && this.titulo.length > 0){
            updateData.titulo = this.titulo;
        }
        if(typeof this.preco === 'number' && this.preco > 0){
            updateData.preco = this.preco;
        }
        if(typeof this.estoque === 'number'){
            updateData.estoque = this.estoque;
        }

        if (Object.keys(updateData).length === 0){
            throw new NoData()
        }

        Table.update({id:this.id, supplier:this.supplier}, updateData)
    }

    decrementQtd(){
        return Table.subtract(this.id,this.supplier,'estoque',this.estoque)
    }
}

module.exports = Product;