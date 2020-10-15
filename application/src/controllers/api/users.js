'use strict'

const { Router } = require('express')
const { UserEmailAlreadyTakenError, UserUsernameAlreadyTakenError } = require('../../services/exceptions/userExceptions')
const jsonParser = require('express').json()
const userService = require('../../services/userService')

const router = Router()

router.post('/', jsonParser, async (req, res, next) => {
    
    try {
        
        const user = await userService.createUser(req.body)
        res.status(201).json(user.toJSON())
    
    } catch (e){ 

        if (e instanceof UserEmailAlreadyTakenError){
            res.status(403).json({ error: e.message })
            return
        }

        if (e instanceof UserUsernameAlreadyTakenError){
            res.status(403).json({ error: e.message })
            return
        }
        
        next(e) 
    }
})

module.exports = router