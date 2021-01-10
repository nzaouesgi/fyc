'use strict'

const { Router } = require('express')
const { 
    UserEmailAlreadyTakenError,
    UserUsernameAlreadyTakenError 
} = require('../../services/exceptions/userExceptions')
const jsonParser = require('express').json()
const userService = require('../../services/userService')
const multer = require('multer')
const { Roles } = require('../middlewares/controlRole')
const controlLogic = require('../middlewares/controlLogic')
const controlRole = require('../middlewares/controlRole')

const router = Router()

router.post('/', 

controlRole(Roles.ANONYMOUS),

jsonParser, async (req, res, next) => {

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

router.get('/:id', 

async (req, res, next) => {
    
    try {

        const user = await userService.findUserById(req.params.id)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

router.put('/:id/password', 

controlRole(Roles.USER),

controlLogic(req => {

    if (req.session.user.id === req.params.id)
        return true
    
    throw new Error('You cannot modify someone else password')
}),

async (req, res, next) => {
    res.status(500).end('Not implemented')
})

const multipartParser = multer({
    storage: multer.memoryStorage(),
    preservePath: true
})

router.patch('/:id', 

controlRole(Roles.USER),

controlLogic(req => {

    if (req.session.user.id === req.params.id)
        return true
    
    throw new Error('You cannot modify someone else profile')
}),

multipartParser.single('picture'), 

async (req, res, next) => {

    try {

        const { file, body } = req

        const user = await userService.update(req.params.id, body, file)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

module.exports = router