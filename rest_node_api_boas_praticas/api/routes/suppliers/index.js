const router = require('express').Router()
const TableSupplier = require('./TableSupplier')
const Supplier = require('./Supplier')
const SerializerSupplier = require('../../Serializer').SerializerSupplier


router.get("/", async (req, res) => {
    const results = await TableSupplier.list()
    const serializer = new SerializerSupplier(res.getHeader('Content-Type'))

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

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id: id })
        await supplier.get()
        const serializer = new SerializerSupplier(res.getHeader('Content-Type'), ['mail', 'createdAt', 'updatedAt', 'version'])
        res.status(200).send(serializer.serialize(supplier))
    } catch (error) {
       next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const supplier = new Supplier(dados)
        await supplier.update()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id: id })
        await supplier.get()
        await supplier.remove()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

const productRouter = require('./products');

router.use('/:id/products', productRouter)

module.exports = router