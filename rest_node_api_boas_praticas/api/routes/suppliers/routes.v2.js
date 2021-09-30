const router = require('express').Router()
const TableSupplier = require('./TableSupplier')
const Supplier = require('./Supplier')
const SerializerSupplier = require('../../Serializer').SerializerSupplier

router.options('/', (req, res)=>{
    res.set("Access-Control-Allow-Methods", 'POST, GET')
    res.set("Access-Control-Allow-Headers", 'Content-Type')
    res.status(204)
    res.end()
})

router.get("/", async (req, res) => {
    const results = await TableSupplier.list()
    const serializer = new SerializerSupplier(res.getHeader('Content-Type'), ["category"])

    res.status(200).send(serializer.serialize(results))
})

router.post("/", async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const supplier = new Supplier(dadosRecebidos)
        await supplier.create()
        const serializer = new SerializerSupplier(res.getHeader('Content-Type'))
        res.status(201).send(serializer.serialize(supplier))
    } catch (error) {
        next(error)
    }

})

module.exports = router