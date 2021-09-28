const Sequelize = require('sequelize');
const instance = require('../../../database/index');

const colunas = {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque:{
        type: Sequelize.INTEGER, 
        allowNull: false,
        defaultValue: 0
    },
    supplier:{
        // CHAVE ESTRANGEIRA
        type: Sequelize.INTEGER, 
        allowNull: false,
        references:{
            model: require('../SupplierTableModel'),
            key: 'id'
        }
    }
}

const opcoes ={
    freezTableName: true,
    tableName:'product',
    timestamps: true
}

module.exports = instance.define('product', colunas, opcoes);