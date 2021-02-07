'use strict'

const { Router, json } = require('express')
const postService = require('../../services/postService')
const controlLogic = require('../middlewares/controlLogic')
const controlRole = require('../middlewares/controlRole')
const Roles = controlRole.Roles

const router = Router()

router.get('/', async (req, res, next) => {

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

controlRole(Roles.USER),

controlLogic(async (req, res) => {
    
    const { id } = req.params
    
    const post = postService.findById(id)

    if (post.author.id !== req.session.user.id)
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