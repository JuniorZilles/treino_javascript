const router = require("express").Router()

const favoriteGames = []
router.post('/', (req,res)=>{
    try {
        if (!req.body.name || !req.body.platform) {
            throw new Error('Campos inválidos!')
          }
          favoriteGames.push(req.body)
        res.send(JSON.stringify(req.body))
    } catch (error) {
        res.send(JSON.stringify({ mensagem: error.message }))
    }
    
})


router.get('/', (req,res)=>{
    try {
        res.send(JSON.stringify(favoriteGames))
    } catch (error) {
        res.send(JSON.stringify({ mensagem: error.message }))
    }
    
})
module.exports = router