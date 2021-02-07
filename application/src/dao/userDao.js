'use strict'

const User = require('../models/User')
const { QueryTypes } = require('sequelize')
const { currentSqlTimestamp } = require('./helpers')

const userDao = {

    findOneById: async function (id){
        
        const user = await User.findByPk(id)

        return user
    },

    findOneByEmail: async function (email){
        
        const sql = `SELECT * FROM ${User.tableName} WHERE email = $email`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            bind: { email },
            mapToModel: true,
            model: User
        })

        return user
    },

    findOneByUsername: async function (username){
        
        const sql = `SELECT * FROM ${User.tableName} WHERE username = $username`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            bind: { username },
            mapToModel: true,
            model: User
        })

        return user
    },

    insertOne: async function ({ id, username, email, password }){

        const sql = `INSERT INTO ${User.tableName} (id, email, username, password, createdAt, updatedAt) ` + 
            `VALUES ($id, $email, $username, $password, $createdAt, $updatedAt)`

        const timestamp = currentSqlTimestamp()

        await User.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            bind: {
                id,
                username,
                email,
                password,
                createdAt: timestamp,
                updatedAt: timestamp
            }
        })
    },
}

module.exports = userDao