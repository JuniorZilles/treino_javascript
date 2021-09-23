const Sequelize = require('sequelize')
const instancia = require("../../database")
const columns = {
    company:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    mail:{
        type: Sequelize.STRING,
        allowNull: false
    },
    category:{
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }

}

const opcoes ={
    freezTableName: true,
    tableName:'supplier',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version'
}

module.exports = instancia.define('supplier', columns, opcoes)