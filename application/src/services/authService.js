'use strict'

const User = require('../models/User')
const userDao = require('../dao/userDao')
const crypto = require('crypto')

const authService = {

    login: async function ({ email, password }) {

        const user = await userDao.findOneByEmail(email)

        console.log(user)

        if (!(user instanceof User))
            return null

        const hash = crypto.createHash('md5')
        hash.update(password)

        if (hash.digest('hex') !== user.password)
            return null
        
        return user
    }
}

module.exports = authService