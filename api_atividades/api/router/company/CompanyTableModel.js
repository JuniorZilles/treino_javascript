const Sequelize = require("sequelize");
const colunas = {
  titulo: { type: Sequelize.STRING, allowNull: false },
  endereco: { type: Sequelize.STRING, allowNull: false },
  quantidadeDeFuncionarios: { type: Sequelize.INTEGER, allowNull: false },
}