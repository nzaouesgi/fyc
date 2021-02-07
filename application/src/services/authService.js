'use strict'

const User = require('../models/User')
const userDao = require('../dao/userDao')
const argon2 = require('argon2')

const authService = {

    login: async function ({ email, password }) {

        const user = await userDao.findOneByEmail(email)

        if (!(user instanceof User))
            return null

        if ((await argon2.verify(user.password, password)) !== true)
            return null
        
        return user
    }
}

module.exports = authService