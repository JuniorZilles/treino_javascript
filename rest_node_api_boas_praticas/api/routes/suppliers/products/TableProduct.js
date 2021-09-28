const { insert } = require('../TableSupplier')
const Model = require('./ProductTableModel')
module.exports = {
    list(idSupplier) {
        return Model.findAll({
            where:{
                supplier:idSupplier
            }
        })
    },

    insert(data){
        return Model.create(data);
    }
}