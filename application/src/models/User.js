'use strict'

const { Model, DataTypes } = require('sequelize')
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

        picture: {
            type: DataTypes.STRING(1024),
            allowNull: true
        },
        
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }, 

        

    }, { sequelize })
}

User.associate = function (models) {

    User.hasMany(models.Post, {
        foreignKey: {
            allowNull: false,
            name: 'authorId'
        },
        as: 'threads'
    })
}

module.exports = User