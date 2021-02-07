'use strict'

const { Router, json } = require('express')
const Post = require('../../models/Post')
const postService = require('../../services/postService')
const controlLogic = require('../middlewares/controlLogic')
const controlRole = require('../middlewares/controlRole')
const validate = require('../middlewares/validate')
const Roles = controlRole.Roles
const Joi = require('joi')


const router = Router()

router.get('/', 

validate(Joi.object({
    page: Joi.number().min(0),
    limit: Joi.number().min(1).max(100)
}), 'query'),


async (req, res, next) => {

    try {

        const { page = 0, limit = 25 } = req.query

        const pagination = await postService.paginate({ page, limit })

        res
            .json({
                count: pagination.count,
                data: pagination.rows.map(row => row.toJSON())
            })

    } catch (e) { next(e) }
})

router.post('/', 

controlRole(Roles.USER),

json(), 

validate(Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .required(),
    message: Joi.string()
        .min(1)
        .max(1024)
        .required()
})),

async (req, res, next) => {

    try {

        const { title, message } = req.body
        const authorId = res.locals.connectedUser.id

        const post = await postService.create({ title, message, authorId })

        res
            .status(201)
            .json(post)

    } catch (e) { next(e) }
})

router.delete('/:id', 

validate(Joi.object({
    id: Joi.string().uuid().required()
}), 'params'),

controlRole(Roles.USER),

controlLogic(async (req, res) => {
    
    const { id } = req.params
    
    const post = await postService.findById(id)

    if ((post instanceof Post) !== true || post.author.id !== res.locals.connectedUser.id)
        throw new Error('This post does not belong to you.')

    return true
}),

async (req, res, next)  => {
    try {

        const { id } = req.params

        await postService.delete(id)
    
        res.status(204).end()

    } catch (e) { next(e) }
})

module.exports = router