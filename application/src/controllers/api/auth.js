'use strict'

const { Router } = require('express')
const authService = require('../../services/authService')
const controlRole = require('../middlewares/controlRole')
const Roles = controlRole.Roles
const router = Router()
const jsonParser = require('express').json

router.post('/login', 

controlRole(Roles.ANONYMOUS),

jsonParser(), 

(req, res, next) => {
    
    authService.login(req.body)
    
    .then(user => { 
        
        if (user === null){
            res.status(401).end()
            return 
        }

        req.session.user = user.id

        res.status(204).end()
    })
    
    .catch(next)
})

router.delete('/logout', 

controlRole(Roles.USER),

(req, res, next) => {

    req.session.regenerate(err => {
        if (err){
            next(err)
            return
        }
        res.status(204).end()
    })
})

module.exports = router