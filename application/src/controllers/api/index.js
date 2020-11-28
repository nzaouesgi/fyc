'use strict'
const usersApi = require('./users')
const postsApi = require('./posts')
const authApi = require('./auth')

const { Router } = require('express')

const api = Router()
api.use('/users', usersApi)
api.use('/posts', postsApi)
api.use('/auth', authApi)

module.exports = api