'use strict'

const express = require('express')
const path = require('path')
const frontRouter = require('../controllers/front/front')
const usersApi = require('../controllers/api/users')
const postsApi = require('../controllers/api/posts')
const authApi = require('../controllers/api/auth')
const session = require('express-session')
const { rootDir } = require('../utils')
const errors = require('../controllers/errors/errors')
const compression = require('compression')
const { Router } = require('express')
const deserializeUser = require('../controllers/middlewares/deserializeUser')
const SessionStore = require('connect-session-sequelize')(session.Store)
const sequelize = require('../constants/sequelize')

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

app.use(session({
    resave: false,
	saveUninitialized: true,
    store,
    secret: 'notverysecret'
}))

app.use(deserializeUser)

app.use('/static', express.static(path.resolve(rootDir, 'static')))

app.use(frontRouter)

const api = Router()
api.use('/users', usersApi)
api.use('/posts', postsApi)
api.use('/auth', authApi)

api.use(errors.apiErrorHandler)

app.use('/api', api)

app.all('/api/*', errors.apiNotFoundHandler)
app.all('*', errors.notFoundHandler)
app.use(errors.errorHandler)

module.exports = app