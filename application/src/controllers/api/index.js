'use strict'
const usersApi = require('./users')
const postsApi = require('./posts')
const authApi = require('./auth')

const { Router } = require('express')

const api = Router()

api.use((req, res, next) => {
    res.set('Content-Security-Policy', 'default-src \'none\';')
    next()
})

api.use('/users', usersApi)
api.use('/posts', postsApi)
api.use('/auth', authApi)

module.exports = api