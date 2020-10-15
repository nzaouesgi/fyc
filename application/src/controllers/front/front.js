'use strict'

const escapingFunctions = require('../middlewares/escaping')
const { Router } = require('express')

const router = Router()

router.use(escapingFunctions)

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/logout', (req, res, next) => {
    res.render('logout')
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

module.exports = router