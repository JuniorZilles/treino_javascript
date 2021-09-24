const router = require("express").Router()
const NotFound = require('../../errors/NotFound')
const EmptyField = require('../../errors/EmptyField')

router.put('/:id', async (req, res) => {
    try {
      const data = req.body
      const id = req.params.id
  
      const encontrado = await TabelaDeUsuarios.pegarPorId(id)
  
      if (!encontrado) {
        throw new NotFound()
      }
  
      if (data.nome.length === 0) {
        throw new EmptyField("nome")
      }
  
      const user = new Usuario(Object.assign({}, data, { id: id }))
      await user.atualizar()
      res.end()
    } catch (erro) {
        let status = 500
        if(error instanceof NotFound){
            status = 404
        }

        if(error instanceof EmptyField){
            status = 400
        }
        res.status(status).json({ mensagem: erro.mensagem })
    }
  })

module.exports = router