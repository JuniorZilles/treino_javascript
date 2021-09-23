const router = require('express').Router()
const TableSupplier = require('./TableSupplier')
const Supplier = require('./Supplier')

router.get("/", async (req, res) => {
    const results = await TableSupplier.list()
    res.send(JSON.stringify(results))
})

router.post("/", async (req, res) => {
    const dadosRecebidos = req.body
    const supplier = new Supplier(dadosRecebidos)
    await supplier.create()
    res.send(JSON.stringify(supplier))
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id: id })
        await supplier.get()
        res.send(JSON.stringify(supplier))
    } catch (error) {
        res.send(JSON.stringify({ mensagem: error.message }))
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const supplier = new Supplier(dados)
        await supplier.update()
        res.end()
    } catch (error) {
        res.status(400).send(JSON.stringify({ mensagem: error.message }))
    }
})

module.exports = router