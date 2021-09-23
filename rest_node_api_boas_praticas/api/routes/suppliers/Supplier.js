const TableSupplier = require('./TableSupplier')

class Supplier{
    constructor({id, company, mail, category, createdAt, updatedAt, version}){
        this.id = id, 
        this.company = company
        this.mail = mail
        this.category = category 
        this.createdAt = createdAt 
        this.updatedAt = updatedAt
        this.version = version
    }

    async create(){
        this.validar()
        const result = await TableSupplier.insert({
            company: this.company,
            mail: this.mail,
            category:this.category
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
        this.version = result.version
    }

    async get(){
        const supplierGot = await TableSupplier.getById(this.id)
        this.company = supplierGot.company
        this.mail = supplierGot.mail,
        this.category= supplierGot.category
        this.createdAt = supplierGot.createdAt
        this.updatedAt = supplierGot.updatedAt
        this.version = supplierGot.version
    }

    async update(){
        await TableSupplier.getById(this.id)
        const fields = ['company', 'mail', 'category']
        const dataToUpdate = {}
        fields.forEach((field)=>{
            const value = this[field]
            if(typeof value === 'string' && value.length > 0){
               
                dataToUpdate[field] = value
            }
        })
        if (Object.keys(dataToUpdate).length === 0){
            throw new Error("Não foram fornecidos dados para atualizar")
        }

        await TableSupplier.update(this.id, dataToUpdate)
    }

    remove(){
        return TableSupplier.delete(this.id);
    }

    validar(){
        const fields = ['company', 'mail', 'category']

        fields.forEach((field)=>{
            const value = this[field]
            if(typeof value !== 'string' || value.length === 0){
                throw new Error(`O campo '${campo}' está inválido`)                
            }
        })
    }
}

module.exports = Supplier