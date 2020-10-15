'use strict'

const { v4 } = require('uuid')
const threadMessageDao = require('../dao/threadMessageDao')

module.exports = {

    paginate: async function (page, limit, threadId){
        
        const pagination = await threadMessageDao.paginate(page, limit, threadId)
        
        return pagination
    },

    create: async function (content, authorId){
        
        await threadMessageDao.insertOne({
            id: v4(),
            content,
            authorId
        })
    }
}