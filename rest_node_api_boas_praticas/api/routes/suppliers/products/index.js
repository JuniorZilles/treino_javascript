const router = require('express').Router({mergeParams:true});
const Table = require('./TableProduct');
const Produto = require('./Product');


router.get('/', async (req, res)=>{
    const prod = await Table.list(req.params.id);
    res.status(200).json(prod);
});

router.post('/', async (req, res)=>{
    const supplierId = req.params.id;
    const body =  req.body;
    const dados = Object.assign({}, body, {supplier:supplierId});
    const prod = new Produto(dados);
    await prod.create();
    res.status(201).json(prod);
})

const complainsRouter = require('./complains');

router.use('/:idProd/complains', complainsRouter)

module.exports = router;