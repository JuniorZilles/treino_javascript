const Model = require("./SupplierTableModel")
const NotFound = require('../../errors/NotFound')

module.exports = {
    list() {
        return Model.findAll({raw:true})
    },

    insert(supplier) {
        return Model.create(supplier)
    },

    async getById(id) {
        const found = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!found) {
            throw new NotFound('Fornecedor')
        }

        return found
    },

    update(id, data) {
        return Model.update(data, { where: { id: id } })
    },

    delete(id){
        return Model.destroy({where:{id:id}})
    }
}