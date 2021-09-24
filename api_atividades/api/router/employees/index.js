const router = require("express").Router()
router.get('/', (requisicao, resposta) => {
    // const listaDeFuncionarios = ...
    resposta.send(JSON.stringify(listaDeFuncionarios))
})

router.post('/', (requisicao, resposta) => {
    try {
        // const funcionario = ...
        resposta.send(JSON.stringify(funcionario))
    } catch (erro) {
        // resposta.send...
    }
})

router.get('/:id', (requisicao, resposta) => {
    try {
        // const funcionario = ...
        resposta.send(JSON.stringify(funcionario))
    } catch (erro) {
        // resposta.send...
    }
})

router.put('/:id', (requisicao, resposta) => {
    try {
        // const funcionario = ...
        resposta.send(JSON.stringify(funcionario))
    } catch (erro) {
        // resposta.send...
    }
})

router.delete('/:id', (requisicao, resposta) => {
    try {
        // const funcionario = ...
        resposta.send(JSON.stringify(funcionario))
    } catch (erro) {
        // resposta.send...
    }
})

module.exports = router