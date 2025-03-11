const express = require('express')
const app = express()
const { getEndpoints } = require('./nc-news.controller')
const { notFoundError, psqlError, customError, serverError } = require('./error-handler.controller')

app.use(express.json())

app.get('/api', getEndpoints)

app.all('*', notFoundError)

app.use(psqlError)
app.use(customError)
app.use(serverError)

module.exports = app