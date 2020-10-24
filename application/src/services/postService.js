'use strict'

const { v4 } = require('uuid')
const postDao = require('../dao/postDao')
const Thread = require('../models/Post')

module.exports = {

    paginate: async function ({ page, limit }) {
        return await postDao.paginate({ page, limit })
    },

    create: async function ({ title, message, authorId }) {

        const id = v4()

        await postDao.insertOne({
            id,
            title,
            message,
            authorId
        })

        const createdPost = await Thread.findByPk(id)

        return createdPost
    }
}