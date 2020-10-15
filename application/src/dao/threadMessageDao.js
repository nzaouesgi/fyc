'use strict'

const ThreadMessage = require('../models/ThreadMessage')

module.exports = {

    insertOne: async function ({ id, content, authorId, threadId }){

        const sql = `INSERT INTO ${ThreadMessage.tableName} (id, content, createdAt, updatedAt, authorId, threadId)` + 
            ` VALUES ("${id}", "${content}", "${new Date()}", "${new Date()}", "${authorId}", "${threadId}")`

        await ThreadMessage.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },

    paginate: async function (page, limit){

        const pagination = await ThreadMessage.findAndCountAll({
            limit,
            offset: limit * page
        })

        return pagination
    }
}