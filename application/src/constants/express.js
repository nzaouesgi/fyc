'use strict'

const express = require('express')
const path = require('path')
const front = require('../controllers/front')
const api = require('../controllers/api/')
const session = require('express-session')
const { rootDir } = require('../utils')
const errors = require('../controllers/errors/errors')
const compression = require('compression')
const deserializeUser = require('../controllers/middlewares/deserializeUser')
const SessionStore = require('connect-session-sequelize')(session.Store)
const sequelize = require('../constants/sequelize')
const csrf = require('../controllers/middlewares/csrf')
const { Router } = require('express')

const app = express()

for (const [key, value] of Object.entries({
    'view engine': 'ejs',
    'views': path.resolve(rootDir, 'views'),
    'x-powered-by': false
})) app.set(key, value)


app.use(compression())

const store = new SessionStore({
    db: sequelize
})

app.use('/static', express.static(path.join(rootDir, 'static')))

app.use(session({
    resave: false,
	saveUninitialized: true,
    store,
    cookie: {
        sameSite: 'strict'
    },
    secret: 'notverysecret'
}))
app.use(deserializeUser)
app.use(csrf)

app.use('/api', api)
app.all('/api/*', errors.apiNotFoundHandler)

app.use('/app', front)
app.all('*', (req, res, next) => res.redirect('/app'))

app.use(errors.errorHandler)

module.exports = app