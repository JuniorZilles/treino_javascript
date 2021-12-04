# INSTALL nestjs

npm i -g @nestjs/cli

### nestjs comands

```
# generates a new module
nest g module <name>

# generates a new controller and updates to refer to the module
nest g controller <name>

# generates a new service and updates to refer to controller
nest g service <name>

# generates all previews files with simple crud operations
nest g resource todos
    - select REST API
    - select yes to generate the CRUD operations
```

### PACKAGES

###### documentação
yarn add @nestjs/swagger swagger-ui-express 

###### validação
yarn add class-validator class-transformer
