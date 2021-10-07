const CorreiosClient = require('../services/correiosSOAPclient')

module.exports = function (app) {
  app.post('/correios/calcula-prazo', function (req, res) {
    const dados = req.body
    const client = new CorreiosClient()
    client.calculaPrazo(dados, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro)
        return
      } 
      console.log('prazo calculado')
      res.json(resultado)
    })
  })
}
