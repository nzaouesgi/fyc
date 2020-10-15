'use strict'

const { v4 } = require('uuid')
const threadDao = require('../dao/threadDao')

module.exports = {

    paginate: async function (page, limit){
        return await threadDao.paginate(page, limit)
    },

    create: async function (title, authorId){
        return await threadDao.insertOne({
            id: v4(),
            title,
            authorId
        })
    }
}