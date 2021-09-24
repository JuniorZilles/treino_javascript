class Serializer {
    json (dados) {
        return JSON.stringify(dados)
    }
  
    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(
                this.filtrar(dados)
            )
        }
  
        throw new Error(this.contentType)
    }
  
    filtrarObjeto (dados) {
        const novoObjeto = {}
  
        this.camposPublicos.forEach((campo) => {
            if (dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })
  
        return novoObjeto
    }
  
    filtrar (dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }
  
        return dados
    }
  }

class SerializerUser extends Serializer{
    constructor(contentType){
        super()
        this.publicFields = ['id', 'name']
        this.contentType = contentType

    }
}

module.exports = {
    Serializer:Serializer,
    SerializerUser:SerializerUser,
    formatosAceitos:['application/json']
}