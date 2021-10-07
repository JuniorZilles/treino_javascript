const fs = require('fs')

module.exports = (app)=>{
    app.post('/upload/imagem', (req, res)=>{
        console.log('recebendo imagem')
        const fName = req.headers.filename
        req.pipe(fs.createWriteStream(`files/${fName}`))
            .on('finish', ()=>{
            console.log('saved image');
            res.status(201).send('ok')
        })
        
    })
}