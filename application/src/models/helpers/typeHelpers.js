'use strict'

const { DataTypes } = require('sequelize')

const idType = {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
}

module.exports = {
    idType
}