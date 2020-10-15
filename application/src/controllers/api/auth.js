'use strict'

const { Router } = require('express')
const authService = require('../../services/authService')
const router = Router()
const jsonParser = require('express').json

router.post('/login', jsonParser(), (req, res, next) => {
    
    authService.login(req.body)
    
    .then(user => { 
        
        if (user === null){
            res.status(401).end()
            return 
        }

        req.session.user = user.id

        req.session.save(err => {
            
            res.status(204).end()
        })
    })
    
    .catch(next)
})

router.delete('/logout', (req, res, next) => {

    req.session.regenerate(err => {
        if (err){
            next(err)
            return
        }
        res.status(204).end()
    })
})

module.exports = router