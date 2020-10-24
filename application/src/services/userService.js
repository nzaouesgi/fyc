'use strict'

const crypto = require('crypto')
const User = require('../models/User')
const { v4 } = require('uuid')
const userDao = require('../dao/userDao')
const { UserEmailAlreadyTakenError, UserUsernameAlreadyTakenError } = require('./exceptions/userExceptions')

const userService = {

    createUser: async function ({ email, username, password }) {

        const hash = crypto.createHash('md5')
        hash.update(password)

        const existingWithMail = await userDao.findOneByEmail(email)

        if (existingWithMail instanceof User)
            throw new UserEmailAlreadyTakenError('Email is already taken')

        const existingWithUsername = await userDao.findOneByUsername(username)

        if (existingWithUsername instanceof User)
            throw new UserUsernameAlreadyTakenError('Username is already taken')

        await userDao.insertOne({ 
            id: v4(), 
            username, 
            email, 
            password: hash.digest('hex') 
        })

        const createdUser = await userDao.findOneByEmail(email)

        return createdUser
    },

    findUserById: async function (id) {
        
        const user = await userDao.findOneById(id)

        return user
    },

    findUserByEmail: async function (email) {

        const user = await userDao.findOneByEmail(email)

        return user
    }
}

module.exports = userService