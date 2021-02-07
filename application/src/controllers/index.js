'use strict'

const escapingFunctions = require('./middlewares/escaping')
const { Router } = require('express')
const userService = require('../services/userService')

const router = Router()

router.use(escapingFunctions)

router.use(async (req, res, next) => {
    try {
        res.locals.csrfToken = await req.generateCsrfToken()
        next()
    } catch (e){ next(e) }
})

router.use((req, res, next) => {
    res.locals.documentBase = `${req.protocol}://${req.hostname}/app/`
    next()
})

router.get('/', (req, res, next) => {
    res.locals.param = req.query.param
    res.render('index')
})

router.get('/profile', (req, res, next) => {
    res.render('profile', { ...res.locals.connectedUser })
})

router.get('/users/:id', async (req, res, next) => {

    try {

        const user = await userService.findUserById(req.params.id)

        res.render('user', {
            user
        })

    } catch (e){ next(e) }
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