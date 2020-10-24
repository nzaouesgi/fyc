'use strict'

const app = require('../constants/express')
const sequelize = require('../constants/sequelize')

const appLoader = async () => {
    app.listen(80)

    await sequelize.sync()
}

module.exports = appLoader