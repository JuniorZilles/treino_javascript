const express = require("express")
const config = require("config")
const app = express()

app.use(express.json())

const movies = require('./router/movies')
app.get('/api/movies', movies)

const games = require('./router/games')
app.get('/api/games', games)

app.listen(config.get("api.port"), ()=> console.log("Api Rodando"))