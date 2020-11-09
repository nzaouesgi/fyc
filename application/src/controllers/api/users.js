'use strict'

const { Router } = require('express')
const { 
    UserEmailAlreadyTakenError,
    UserUsernameAlreadyTakenError 
} = require('../../services/exceptions/userExceptions')
const jsonParser = require('express').json()
const userService = require('../../services/userService')
const multer = require('multer')

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

router.get('/:id', async (req, res, next) => {
    
    try {

        const user = await userService.findUserById(req.params.id)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

router.put('/:id/password', async (req, res, next) => {
    
    try {



    } catch (e){ next(e) }
})

const multipartParser = multer({
    storage: multer.memoryStorage(),
    preservePath: true
})

router.patch('/:id', multipartParser.single('picture'), async (req, res, next) => {

    try {

        const { file, body } = req

        const user = await userService.update(req.params.id, body, file)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

module.exports = router