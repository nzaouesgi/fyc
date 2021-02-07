'use strict'

const argon2 = require('argon2')
const User = require('../models/User')
const { v4 } = require('uuid')
const userDao = require('../dao/userDao')
const { UserEmailAlreadyTakenError, UserUsernameAlreadyTakenError } = require('./exceptions/userExceptions')
const path = require('path')
const fs = require('fs')
const { rootDir } = require('../utils')

const userService = {

    createUser: async function ({ email, username, password }) {

        const hash = await argon2.hash(password, {
            hashLength: 32,
            saltLength: 15,
            timeCost: 400,
            memoryCost: 400,
            parallelism: 4
        })

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
            password: hash
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
    },

    update: async function (id, fields, file){

        const user = await userDao.findOneById(id)

        const pictureUploadFolder = path.join(rootDir, 'static/user_img')

        if (fields.username && fields.username !== user.username){
            const exists = await userDao.findOneByUsername(fields.username)
            if (exists instanceof User){
                throw new UserUsernameAlreadyTakenError('Username is already taken')
            }
        }

        if (file){

            if (user.picture){
                try {
                await fs.promises.unlink(path.join(pictureUploadFolder, user.picture))
                } catch (e){}
            }

            await fs.promises.writeFile(path.join(pictureUploadFolder, file.originalname), file.buffer)
        }  

        const updatedUser = await user.update({ ...fields, picture: file ? file.originalname : user.picture })

        return updatedUser
    }
}

module.exports = userService