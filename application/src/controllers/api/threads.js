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

router.post('/', json(), async (req, res, next) => {

    try {

        const { title } = req.body
        const { authorId } = req.session.user.id

        const thread = await threadService.create(title, authorId)

        res
            .status(201)
            .json(thread)

    } catch (e) { next(e) }
})

router.get('/:threadId/messages', async (req, res, next) => {
    
    try {

        const { threadId } = req.params
        const { page, limit } = req.query

        const pagination = await threadMessageService.paginate(page, limit, threadId)

        res.json({
            count: pagination.count,
            data: pagination.map(message => message.toJSON())
        })

    } catch (e) { next(e) }
})

router.post('/:threadId/messages', json(), async (req, res, next) => {

    try {

        const { threadId } = req.params
        const { content } = req.body

        const message = await threadMessageService.create(content, threadId)

        res.status(204).json({
            data: message.toJSON()
        })

    } catch (e){ next(e) }
})

module.exports = router