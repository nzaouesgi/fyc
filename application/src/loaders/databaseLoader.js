'use strict'

const sequelize = require('../constants/sequelize')
const Post = require('../models/Post')
const User = require('../models/User')

const databaseLoader = async () => {

    const models = [ 
        User,
        Post
    ]

    for (const model of models)
        if (typeof model.initialize === 'function')
            model.initialize(sequelize)

    for (const model of models)
        if (typeof model.associate === 'function')
            model.associate(Object.fromEntries(models.map(m => [ m.name, m ])))
    
    await sequelize.sync()
}

module.exports = databaseLoader