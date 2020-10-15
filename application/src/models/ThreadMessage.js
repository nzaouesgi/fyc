'use strict'

const { Model, DataTypes } = require('sequelize')
const { idType } = require('./helpers/typeHelpers')

class ThreadMessage extends Model {}

ThreadMessage.initialize = function (sequelize){

    ThreadMessage.init({
        
        id: idType,

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    }, { sequelize })
}

ThreadMessage.associate = function (models){
    
    ThreadMessage.belongsTo(models.User, {
        foreignKey: {
            name: 'authorId',
            allowNull: false
        },
        as: 'author'
    })

    ThreadMessage.belongsTo(models.Thread, {
        foreignKey: {
            name: 'threadId',
            allowNull: false
        },
        as: 'thread'
    })
}

module.exports = ThreadMessage