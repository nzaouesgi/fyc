'use strict'

const { Sequelize } = require('sequelize')
const os = require('os')
const path = require('path')

const sqliteDatabasePath = path.join(os.tmpdir(), 'postbin_database.sqlite')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqliteDatabasePath,
    logging: console.log,
    dialectOptions: {
        multipleStatements: true
    }
})

module.exports = sequelize

