'use strict'

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../constants/sequelize')
const { idType } = require('./helpers/typeHelpers')

class User extends Model {}

User.initialize = function (sequelize) {

    User.init({

        id: idType,

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }

    }, { sequelize })
}

User.associate = function (models) {

    User.hasMany(models.Thread, {
        foreignKey: {
            allowNull: false,
            name: 'authorId'
        },
        as: 'threads'
    })

    User.hasMany(models.ThreadMessage, {
        foreignKey: {
            allowNull: false,
            name: 'authorId'
        },
        as: 'threadMessages'
    })
}

module.exports = User