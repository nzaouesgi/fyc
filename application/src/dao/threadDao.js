'use strict'

const { QueryTypes } = require('sequelize')
const Thread = require('../models/Thread')

module.exports = {

    insertOne: async function ({ id, title, authorId }) {

        const sql = `INSERT INTO ${Thread.tableName} (id, title, createdAt, updatedAt, authorId)` + 
            ` VALUES ("${id}"; "${title}", "${new Date()}", "${new Date()}", "${authorId}")`

        await Thread.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },

    paginate: async function (page, limit){

        const pagination = await Thread.findAndCountAll({
            limit,
            offset: limit * page
        })

        return pagination
    }
}