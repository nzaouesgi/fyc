'use strict'

const express = require('express')
const path = require('path')
const createFrontRouter = require('../controllers/front/front')
const { rootDir } = require('../utils')
const errors = require('../controllers/errors/errors')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(rootDir, 'views'))
app.set('x-powered-by', false)
app.use('/static', express.static(path.resolve(rootDir, 'static')))

app.use(createFrontRouter())

app.all('*', errors.notFoundHandler)
app.use(errors.errorHandler)

module.exports = app