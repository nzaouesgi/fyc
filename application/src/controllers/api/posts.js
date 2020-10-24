'use strict'

const { Router, json } = require('express')
const postService = require('../../services/postService')

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

router.post('/', json(), async (req, res, next) => {

    try {

        const { title, message } = req.body
        const authorId = res.locals.connectedUser.id

        const post = await postService.create({ title, message, authorId })

        res
            .status(201)
            .json(post)

    } catch (e) { next(e) }
})

module.exports = router