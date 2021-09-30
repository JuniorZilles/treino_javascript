const express = require("express")
const config = require('config')
const NotFound = require('./errors/NotFound')
const InvalidField = require('./errors/InvalidField')
const NoData = require('./errors/NoData')
const ReturnTypeNotSuported = require('./errors/ReturnTypeNotSuported')
const formatosAceitos = require('./Serializer').formatosAceitos
const SerializerError = require('./Serializer').SerializerError

const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next)=>{
    let formatoRequisitado = req.header('Accept')
    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406).end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)
    
    next()
})

app.use((req, res, next)=>{
    res.set("X-Powered-By", "Gatito")
    res.set('Access-Control-Allow-Origin', "*")
    // res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // verificar por que não funciona pelo navegador
    // res.set("Content-Security-Policy", "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';base-uri 'self';form-action 'self';")
    next()
})

const router = require("./routes/suppliers")
app.use("/api/suppliers", router)

const v2_router = require('./routes/suppliers/routes.v2')
app.use('/api/v2/suppliers', v2_router)

app.use((error, req, res, next)=>{
    let status = 500
    if(error instanceof NotFound){
        status = 404
    }
    
    if(error instanceof InvalidField || error instanceof NoData){
        status = 400
    }

    if(error instanceof ReturnTypeNotSuported){
        status = 406
    }
    const serializer = new SerializerError(res.getHeader('Content-Type'))
    res.status(status).send(serializer.serialize({ message: error.message, id: error.idError }))
})

app.listen(config.get("api.port"), ()=>{
    console.log("API rodando")
})