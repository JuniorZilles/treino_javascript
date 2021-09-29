const Model = require('./ProductTableModel')
const instancia = require('../../../database')
const NotFound = require('../../../errors/NotFound');

module.exports = {
    list(idSupplier, criterios) {
        return Model.findAll({
            where:criterios || {
                supplier:idSupplier
            }, raw:true
        })
    },

    insert(data){
        return Model.create(data);
    },

    delete(idProd, idSup){
        return Model.destroy({
            where:{
                id:idProd,
                supplier:idSup
            }
        });
    },

    async getById(idProd, idSup){
        const found = await Model.findOne({
            where:{
                id:idProd,
                supplier:idSup
            },
            raw:true
        });        

        if (!found) {
            throw new NotFound("Produto não encontrado");
        }
        return found;
    },

    update(prodData, updateData){
        return Model.update(updateData, {
            where: prodData
        })
    },
    // transaction trata o problema da concorrencia
    subtract(idProd, idSup, field, quantity){
        return instancia.transaction(async transact =>{
            const prod = await Model.findOne({
                where:{
                    id:idProd,
                    supplier:idSup
                }
            });    
            prod[field] = quantity

            await prod.save()

            return prod
        }
        )
    }
}