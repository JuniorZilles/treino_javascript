const router = require('express').Router()
const TableSupplier = require('./TableSupplier')
const TableProduct = require('./products/TableProduct')
const Supplier = require('./Supplier')
const SerializerSupplier = require('../../Serializer').SerializerSupplier

router.options('/', (req, res)=>{
    res.set("Access-Control-Allow-Methods", 'GET, POST')
    res.set("Access-Control-Allow-Headers", 'Content-Type')
    res.status(204)
    res.end()
})

router.get("/", async (req, res) => {
    const results = await TableSupplier.list()
    const serializer = new SerializerSupplier(res.getHeader('Content-Type'), [ 'company', 'category'])

    res.status(200).send(serializer.serialize(results))
})

router.post("/", async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const supplier = new Supplier(dadosRecebidos)
        await supplier.create()
        const serializer = new SerializerSupplier(res.getHeader('Content-Type'), [ 'company', 'category'])
        res.status(201).send(serializer.serialize(supplier))
    } catch (error) {
        next(error)
    }

})

router.options('/:id', (req, res)=>{
    res.set("Access-Control-Allow-Methods", 'GET, PUT, DELETE')
    res.set("Access-Control-Allow-Headers", 'Content-Type')
    res.status(204)
    res.end()
})

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const supplier = new Supplier({ id: id })
        await supplier.get()
        const serializer = new SerializerSupplier(res.getHeader('Content-Type'), ['mail', 'company', 'category', 'createdAt', 'updatedAt', 'version'])
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

router.post('/:id/warehouse-reposition', async (req, res, next) => {
    try {
      const fornecedor = new Supplier({ id: req.params.idFornecedor })
      await fornecedor.get()
      const produtos = await TableProduct.listar(fornecedor.id, { estoque: 0 })
      res.status(200).send({
          mensagem: `${produtos.length} precisam de reposição de estoque`
      })
    } catch (erro) {
        next(erro)
    }
  })
const productRouter = require('./products');

const verifySupplier = async (req, res, next) =>{
    try{
        const id= req.params.id;
        const sup =new Supplier({id:id});
        await sup.get();
        // disponibiliza para as subrotas o valor do objeto
        req.supplier = sup;
        next();
    }catch(error){
        next(error);
    }
}

router.use('/:id/products', verifySupplier, productRouter)

module.exports = router