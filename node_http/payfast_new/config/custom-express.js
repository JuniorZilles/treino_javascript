const express = require('express')
const consign = require('consign')
var morgan = require('morgan')

const logger = require('../services/logger')

const app = express()
app.use(morgan("common",{
    stream:{
        write: (message)=>{
            logger.info(message)
        }
    }
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
consign().include('controllers').into(app)
module.exports = app