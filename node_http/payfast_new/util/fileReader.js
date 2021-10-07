const fs = require('fs')

fs.readFile('imagem.jpg', (erro, buffer) =>{
    console.log('read file')

    fs.writeFile('imagem2.jpg', buffer, (error) =>{
        console.log('writed file');
    })
})