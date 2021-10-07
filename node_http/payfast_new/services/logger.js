const Winston = require('winston')
const fs = require('fs')

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs')
}
const logger = new Winston.createLogger({
    transports:[
        new Winston.transports.File({
            level: "info",
            filename: 'logs/payfast.log',
            maxsize: 100000,
            maxFiles: 10
        })
    ]
})

module.exports = logger