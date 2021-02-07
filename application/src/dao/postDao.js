'use strict'

const { QueryTypes } = require('sequelize')
const Post = require('../models/Post')
const moment = require('moment')
const { currentSqlTimestamp } = require('./helpers')

module.exports = {

    insertOne: async function ({ id, title, message, authorId }) {

        const sql = `INSERT INTO ${Post.tableName} (id, title, message, createdAt, updatedAt, authorId)` + 
            ` VALUES ($id, $title, $message, $createdAt, $updatedAt, $authorId)`

        const timestamp = currentSqlTimestamp()

        await Post.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            bind: { 
                id, 
                title, 
                message, 
                authorId, 
                createdAt: timestamp, 
                updatedAt: timestamp
            }
        })
    },

    findById: async function (id){
        
        const post = await Post.findByPk(id)
        
        return post
    },

    paginate: async function ({page, limit}){

        const pagination = await Post.findAndCountAll({
            limit,
            offset: limit * page,
            order: [ 
                [ 'createdAt', 'DESC' ] 
            ]
        })

        return pagination
    },

    delete: async function (post){
        await post.destroy()
    }
}