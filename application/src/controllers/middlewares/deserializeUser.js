'use strict'

const userService = require('../../services/userService')
const User = require('../../models/User')

module.exports = async (req, res, next) => {
    
    try {
        
        if (typeof req.session.user !== 'string'){
            next()
            return
        }

        const user = await userService.findUserById(req.session.user)

        if (!(user instanceof User)){
            req.session.regenerate(err => {
                if (err){
                    next(err)
                    return
                }
                next()
            })
            return
        }

        res.locals.connectedUser = user

        next()

    } catch (e){ next(e) }
}