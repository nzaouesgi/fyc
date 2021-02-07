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
const Joi = require('joi')
const validate = require('../middlewares/validate')

const router = Router()

const passwordSchema = Joi.string()
    .min(8)
    .regex(/a-z/)
    .regex(/A-Z/)
    .regex(/0-9/)
    .required()

const usernameSchema = Joi.string()
    .alphanum()
    .min(3)
    .max(255)
    .required()

const emailSchema = Joi.string()
    .email()
    .required()

router.post('/', 

controlRole(Roles.ANONYMOUS),

jsonParser, 

validate(Joi.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema
})),

async (req, res, next) => {

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

validate(Joi.object({
    id: Joi.string().uuid().required()
}), 'params'),

async (req, res, next) => {
    
    try {

        const user = await userService.findUserById(req.params.id)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

router.put('/:id/password', 

controlRole(Roles.USER),

controlLogic((req, res) => {

    if (res.locals.connectedUser.id === req.params.id)
        return true
    
    throw new Error('You cannot modify someone else password')
}),

jsonParser,

validate(Joi.object({
    current: Joi.string().required(),
    new: passwordSchema
})),

async (req, res, next) => {
    res.status(500).end('Not implemented')
})

const multipartParser = multer({
    storage: multer.memoryStorage(),
    preservePath: true
})

router.patch('/:id', 

controlRole(Roles.USER),

controlLogic((req, res) => {

    if (res.locals.connectedUser.id === req.params.id)
        return true
    
    throw new Error('You cannot modify someone else profile')
}),

multipartParser.single('picture'), 

validate(Joi.object({
    username: usernameSchema
})),

async (req, res, next) => {

    try {

        const { file, body } = req

        const user = await userService.update(req.params.id, body, file)

        res.json(user.toJSON())

    } catch (e){ next(e) }
})

module.exports = router