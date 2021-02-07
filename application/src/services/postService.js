'use strict'

const { v4 } = require('uuid')
const postDao = require('../dao/postDao')
const Post = require('../models/Post')

module.exports = {

    paginate: async function ({ page, limit }) {
        return await postDao.paginate({ page, limit })
    },

    findById: async function (id){
        return postDao.findById(id)
    },

    create: async function ({ title, message, authorId }) {

        const id = v4()

        await postDao.insertOne({
            id,
            title,
            message,
            authorId
        })

        const createdPost = await Post.findByPk(id)

        return createdPost
    },

    delete: async function (id){
        
        const post = await postDao.findById(id)

        await postDao.delete(post)
    }
}