const Model = require("./SupplierTableModel")

module.exports = {
    list() {
        return Model.findAll()
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
            throw new Error('Fornecedor não encontrado')
        }

        return found
    },

    update(id, data) {
        return Model.update(data, { where: { id: id } })
    }
}