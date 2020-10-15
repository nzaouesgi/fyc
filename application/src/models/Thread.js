'use strict'

const { Model, DataTypes } = require('sequelize')
const { idType } = require('./helpers/typeHelpers')

class Thread extends Model {}

Thread.initialize = function (sequelize){

    Thread.init({

        id: idType,

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, { sequelize })
}

Thread.associate = function (models) {
    
    Thread.belongsTo(models.User, {
        foreignKey: {
            name: 'authorId',
            allowNull: false
        },
        as: 'author'
    })
}

module.exports = Thread