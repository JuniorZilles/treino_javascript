const express = require("express")
const config = require("config")
const app = express()

app.use(express.json())

const movies = require('./router/movies')
app.get('/api/movies', movies)

const games = require('./router/games')
app.get('/api/games', games)

const sites = require('./router/sites')
app.get('/api/sites', sites)

const users = require('./router/users')
app.get('/api/users', users)

const employees = require('./router/employees')
app.get('/api/employees', employees)

app.listen(config.get("api.port"), ()=> console.log("Api Rodando"))