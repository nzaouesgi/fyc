'use strict'

const { Router, json } = require('express')
const threadService = require('../../services/threadService')

const router = Router()

router.get('/', async (req, res, next) => {

    try {

        const { page, limit } = req.query

        const pagination = await threadService.paginate(page, limit)

        res
            .json({
                count: pagination.count,
                data: pagination.rows.map(r => r.toJSON())
            })

    } catch (e) { next(e) }
})

router.get('/', json(), async (req, res, next) => {

    try {

        const { title } = req.body
        const { authorId } = req.session.user.id

        const thread = await threadService.create(title, authorId)

        res
            .status(201)
            .json(thread)

    } catch (e) { next(e) }
})

module.exports = router