'use strict'

const sequelize = require('../constants/sequelize')
const Thread = require('../models/Thread')
const ThreadMessage = require('../models/ThreadMessage')
const User = require('../models/User')

const databaseLoader = async () => {

    const models = [ 
        User,
        Thread,
        ThreadMessage
    ]

    for (const model of models)
        if (typeof model.initialize === 'function')
            model.initialize(sequelize)

    for (const model of models)
        if (typeof model.associate === 'function')
            model.associate(Object.fromEntries(models.map(m => [ m.name, m ])))

    await sequelize.sync({ alter: true })
}

module.exports = databaseLoader