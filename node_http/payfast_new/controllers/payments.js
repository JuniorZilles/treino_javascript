const PaymentDao = require('../database/paymentDao')
const ClientCartoes = require('../services/clientCartoes')
const MemcachedClient = require('../services/MemcachedClient')
const logger = require('../services/logger')
const { body, validationResult } = require('express-validator')
module.exports = app => {
  app.get('/payments', (req, res) => {
    console.log('Got It')
    res.status(200).send('Got It')
  }),
    app.put('/payments/payment/:id', (req, res) => {
      const id = req.params.id
      const pagamento = {}
      pagamento.id = id
      pagamento.status = 'CONFIRMADO'
      const pagamentoDao = new PaymentDao()
      pagamentoDao.atualiza(pagamento, erro => {
        if (erro) {
          res.status(500).send(erro)
          return
        } else {
          console.log('Pagamento Criado')
          res.send(pagamento)
        }
      })
    }),
    app.post(
      '/payments/payment',
      body('pagamento.forma_pagamento')
        .notEmpty()
        .withMessage('Forma de pagamento é obrigatorio'),
      body('pagamento.valor')
        .notEmpty()
        .withMessage('Valor é obrigatorio')
        .isDecimal()
        .withMessage('Deve ser um valor decimal'),
      (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        }
        const payment = req.body.pagamento
        console.log('processando pagamento')

        payment.status = 'Criado'
        payment.data = new Date()

        const pagamentoDao = new PaymentDao()

        pagamentoDao.salva(payment, (erro, result) => {
          if (erro) {
            res.status(500).send(erro)
          } else {
            console.log('pagamento criado')
            payment.id = result.insertId

            const memcachedClient = new MemcachedClient()
            memcachedClient.setCache(
              `pagamento-${payment.id}`,
              payment,
              erro => {
                console.log(`Nova chave adicionada para o id: ${payment.id}`)
              }
            )

            if (payment.forma_pagamento == 'cartao') {
              const cartao = req.body.cartao
              console.log(cartao)
              const client = new ClientCartoes()
              client.autoriza(
                cartao,
                (exception, request, response, returned) => {
                  if (exception) {
                    console.log(exception)
                    res.status(400).json(exception)
                    return
                  }
                  console.log('API cartões')
                  console.log(returned)

                  res.location(`/payments/payment/${result.insertId}`)
                  const content = {
                    dados_pagamento: payment,
                    cartao: returned,
                    links: [
                      {
                        href:
                          'http://localhost:3000/payments/payment/' +
                          payment.id,
                        rel: 'CONFIRMAR',
                        method: 'PUT'
                      },
                      {
                        href:
                          'http://localhost:3000/payments/payment/' +
                          payment.id,
                        rel: 'CANCELAR',
                        method: 'DELETE'
                      }
                    ]
                  }

                  res.status(201).json(content)
                  return
                }
              )
            } else {
              res.location(`/payments/payment/${result.insertId}`)
              const response = {
                dados_pagamento: payment,
                links: [
                  {
                    href:
                      'http://localhost:3000/payments/payment/' + payment.id,
                    rel: 'CONFIRMAR',
                    method: 'PUT'
                  },
                  {
                    href:
                      'http://localhost:3000/payments/payment/' + payment.id,
                    rel: 'CANCELAR',
                    method: 'DELETE'
                  }
                ]
              }
              res.status(201).json(response)
            }
          }
        })
      }
    ),
    app.delete('/payments/payment/:id', (req, res) => {
      const id = req.params.id
      const pagamento = {}
      pagamento.id = id
      pagamento.status = 'CANCELADO'
      const pagamentoDao = new PaymentDao()
      pagamentoDao.atualiza(pagamento, erro => {
        if (erro) {
          res.status(500).send(erro)
          return
        } else {
          console.log('Pagamento Cancelado')
          res.status(204).send(pagamento)
        }
      })
    }),
    app.get('/payments/payment/:id', (req, res) => {
      const id = req.params.id
      logger.info(`Consultando pagamento: ${id}`)
      const memcachedClient = new MemcachedClient()
      memcachedClient.getCache(`pagamento-${id}`, (erro, retorno) => {
        if (erro || !retorno) {
          logger.info('MISS - chave não encontrada')
          const pagamentoDao = new PaymentDao()
          pagamentoDao.buscaPorId(id, (erro, resultado) => {
            if (erro) {
              logger.info(`erro ao consultar no banco: ${erro}`)
              res.status(500).send(erro)
              return
            }
            logger.info(`pagamentos encontrados: ${JSON.stringify(resultado)}`)
            res.status(200).json(resultado)
            return 
          })
        } else {
          logger.info(`HIT - valor: ${JSON.stringify(retorno)}`)
          res.status(200).json(retorno)
          return
        }
      })
    })
}
