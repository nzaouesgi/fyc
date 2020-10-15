'use strict'

const User = require('../models/User')
const { QueryTypes } = require('sequelize')

const userDao = {

    findOneById: async function (id){
        
        const sql = `SELECT * FROM ${User.tableName} WHERE id = "${id}"`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: User
        })

        return user
    },

    findOneByEmail: async function (email){
        
        const sql = `SELECT * FROM ${User.tableName} WHERE email = "${email}"`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: User
        })

        return user
    },

    findOneByUsername: async function (username){
        
        const sql = `SELECT * FROM ${User.tableName} WHERE username = "${username}"`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: User
        })

        return user
    },

    insertOne: async function ({ id, username, email, password }){

        const sql = `INSERT INTO ${User.tableName} (id, email, username, password, createdAt, updatedAt) ` + 
            `VALUES ("${id}", "${email}", "${username}", "${password}", "${new Date()}", "${new Date()}")`

        await User.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },
}

module.exports = userDao