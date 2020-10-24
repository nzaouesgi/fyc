'use strict'

const { Model, DataTypes } = require('sequelize')
const { idType } = require('./helpers/typeHelpers')

class Post extends Model {}

Post.initialize = function (sequelize){

    Post.init({

        id: idType,

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        message: {
            type: DataTypes.STRING(1024),
            allowNull: false
        }
        
    }, { 
        sequelize,
        defaultScope: {
            include: 'author'
        } 
    })
}

Post.associate = function (models) {
    
    Post.belongsTo(models.User, {
        foreignKey: {
            name: 'authorId',
            allowNull: false
        },
        as: 'author'
    })
}

module.exports = Post