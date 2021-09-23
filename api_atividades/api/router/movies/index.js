const router = require("express").Router()

router.use('/', (req,res)=>{
    const results = 
         [
            { nome: 'Monty Python' },
            { nome: 'A bela e a fera' },
            { nome: 'A múmia' }
          ]
    
    res.send(JSON.stringify(results))
})

module.exports = router