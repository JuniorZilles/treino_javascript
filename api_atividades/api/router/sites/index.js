const router = require("express").Router()

const historic = []
router.post('/', (req,res)=>{
    try {
        if (!requisicao.body.url || !requisicao.body.dataDeAcesso) {
            throw new Error('Campos "url" e "dataDeAcesso" são obrigatórios e não podem estar vazios!')
          }

          const site = {
            url: requisicao.body.url,
            dataDeAcesso: requisicao.body.dataDeAcesso
          }
          historic.push(site)
        res.status(201).json(site)
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }  
})

module.exports = router