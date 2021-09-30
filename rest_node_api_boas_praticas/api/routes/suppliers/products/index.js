const router = require('express').Router({ mergeParams: true })
const Table = require('./TableProduct')
const Produto = require('./Product')
const SerializerProduct = require('../../../Serializer').SerializerProduct

router.options('/', (req, res)=>{
  res.set("Access-Control-Allow-Methods", 'GET, POST')
  res.set("Access-Control-Allow-Headers", 'Content-Type')
  res.status(204)
  res.end()
})

router.get('/', async (req, res) => {
  const prod = await Table.list(req.supplier.id)
  const serializer = new SerializerProduct(res.getHeader('Content-Type'))
  res.status(200).send(serializer.serialize(prod))
})

router.post('/', async (req, res, next) => {
  try {
    const supplierId = req.supplier.id
    const body = req.body
    const dados = Object.assign({}, body, { supplier: supplierId })
    const prod = new Produto(dados)
    await prod.create()
    const serializer = new SerializerProduct(res.getHeader('Content-Type'))
    res.set("ETag", prod.version)
    const timestamp = (new Date(prod.updatedAt)).getTime()
    res.set('Last-Modiefied', timestamp)
    res.set('Location', `/api/suppliers/${prod.supplier}/products/${prod.id}`)
    res.status(201).send(serializer.serialize(prod))
  } catch (error) {
    next(error)
  }
})

router.options('/:idProd', (req, res)=>{
  res.set("Access-Control-Allow-Methods", 'GET, PUT, HEAD, DELETE')
  res.set("Access-Control-Allow-Headers", 'Content-Type')
  res.status(204)
  res.end()
})

router.delete('/:idProd', async (req, res) => {
  const dados = { id: req.params.idProd, supplier: req.supplier.id }
  const prod = new Produto(dados)
  await prod.delete()
  res.status(204).end()
})

router.get('/:idProd', async (req, res, next) => {
  try {
    const dados = { id: req.params.idProd, supplier: req.supplier.id }
    const prod = new Produto(dados)
    await prod.getProduct()
    const serializer = new SerializerProduct(res.getHeader('Content-Type'), [
      'preco',
      'estoque',
      'createdAt',
      'updatedAt',
      'version'
    ])
    res.set("ETag", prod.version)
    const timestamp = (new Date(prod.updatedAt)).getTime()
    res.set('Last-Modiefied', timestamp)
    res.status(200).send(serializer.serialize(prod))
  } catch (error) {
    next(error)
  }
})

router.head('/:idProd', async (req, res, next) => {
  try {
    const dados = { id: req.params.idProd, supplier: req.supplier.id }
    const prod = new Produto(dados)
    await prod.getProduct()
    res.set("ETag", prod.version)
    const timestamp = (new Date(prod.updatedAt)).getTime()
    res.set('Last-Modiefied', timestamp)
    res.status(200).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:idProd', async (req, res, next) => {
  try {
    const dados = Object.assign({}, req.body, {
      id: req.params.idProd,
      supplier: req.supplier.id
    })
    const prod = new Produto(dados)
    await prod.update()
    await prod.getProduct()
    res.set("ETag", prod.version)
    const timestamp = (new Date(prod.updatedAt)).getTime()
    res.set('Last-Modiefied', timestamp)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.options('/:idProd/decrement', (req, res)=>{
  res.set("Access-Control-Allow-Methods", 'POST')
  res.set("Access-Control-Allow-Headers", 'Content-Type')
  res.status(204)
  res.end()
})

router.post('/:idProd/decrement', async (req, res, next) => {
  try {
    const prod = new Produto({
      id: req.params.idProd,
      supplier: req.supplier.id
    })
    await prod.getProduct()
    prod.estoque = prod.estoque - req.body.quantity
    await prod.decrementQtd()
    await prod.getProduct()
    res.set("ETag", prod.version)
    const timestamp = (new Date(prod.updatedAt)).getTime()
    res.set('Last-Modiefied', timestamp)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
const complainsRouter = require('./complains')

router.use('/:idProd/complains', complainsRouter)

module.exports = router
