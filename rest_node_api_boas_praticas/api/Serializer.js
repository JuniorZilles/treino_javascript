const ReturnTypeNotSuported = require('./errors/ReturnTypeNotSuported')
const jsontoxml = require('jsontoxml')
class Serializer{
    json(data){
        return JSON.stringify(data)
    }

    xml(data){
        let tag = this.tagSingular
        if (Array.isArray(data)){
            tag = this.tagPlural
            data = data.map((item)=>{
                return {[this.tagSingular]:item}
            })
        }
        return jsontoxml({[tag]:data})
    }

    serialize(data){
        data = this.filter(data)
        if (this.contentType === 'application/json'){
            return data
        }
        if (this.contentType === 'application/xml'){
            return this.xml(data)
        }
        throw new ReturnTypeNotSuported(this.contentType)
    }

    filterObject(data){
        const newObject = {}
        
        this.publicFields.forEach((field)=>{
            if (data.hasOwnProperty(field)){
                newObject[field] = data[field]
            }
        })

        return newObject;
    }

    filter(data){
        if(Array.isArray(data)){
            data= data.map(item => {return this.filterObject(item)})
        }else{
            data = this.filterObject(data)
        }

        return data
    }
}

class SerializerSupplier extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.publicFields = ['id'].concat(extraFields || [])
        this.contentType = contentType
        this.tagSingular = 'supplier'
        this.tagPlural = 'suppliers'
    }
}


class SerializerProduct extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.publicFields = ['id', 'titulo'].concat(extraFields || [])
        this.contentType = contentType
        this.tagSingular = 'product'
        this.tagPlural = 'products'
    }
}

class SerializerError extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.publicFields = ['id', 'message'].concat(extraFields || [])
        this.contentType = contentType
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer:Serializer,
    SerializerSupplier:SerializerSupplier,
    SerializerError:SerializerError,
    SerializerProduct:SerializerProduct,
    formatosAceitos:['application/json', 'application/xml']
}