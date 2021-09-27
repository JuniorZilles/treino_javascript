require('dotenv').config({
    path:process.env.NODE_ENV == 'test' ? '.env.test': '.env'
})

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql", 
    storage: './__tests__/database.sqlite',
    // desabilita os logs
    logging: false,
    define:{
        // cria um created_at e updated_at por padrão
        timestamps: true,
        // snake case no nome das tabelas
        underscore:true,
        // snake case nas colunas das tabelas
        underscoreAll: true,
    },      
};