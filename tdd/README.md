## FONTE
[TDD](https://www.youtube.com/watch?v=2G_mWfG0DZE)
## DEPENDENCIAS

- node.js

### Pacotes

- yarn
- express
- sequelize
- mysql2
- dotenv
- bcryptjs
- jsonwebtoken

### Pacotes Dev

```
# Permite controlar a versão das tabelas
- sequelize-cli
- nodemon
- jest
- supertest
- factory-girl
- faker
```


## COMANDOS

```
# inicia o projeto
- yarn init -y

# inicia a estrutura do sequelize
# cria as pastas config, models, migrations e seeders
- yarn sequelize init
# necessário criar um arquivo .sequelizerc
# estrutura final 
    - __tests__
        # testes que utilizam um banco ou fontes de dados externa
        - integration
        # testes de funções que não iteragem com dados externos, ou seja dada uma entrada de parametros, ele retorna um conteudo sobre o processamento feito com os parâmetros
        - unit
    - src 
        - config
            // configuração do database
            - database.js
        - database
            - migrations
            - seeders
        - app
            - models
        ...
    # configura as rotas dos arquivos necessários pelo sequelize
    - .sequelizerc
    # variáveis de ambiente de desenvolvimento
    - .env
    # variaveis de ambiente de teste
    - .env.test
    - ...

# cria o arquivo de definição de tabela dentro de migrations
- yarn sequelize migration:create --name=create-users
    # dentro há duas funções que devem ser implementadas, up para criar e down para remover
# executa a migração
- yarn sequelize db:migrate

# inicialização do jest
- yarn jest --init
```