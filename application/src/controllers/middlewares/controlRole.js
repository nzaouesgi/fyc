'use strict'

const User = require('../../models/User')

const Roles = {
    ANY: 'any',
    USER: 'user',
    ANONYMOUS: 'anonymous'
}

function isAuthenticated (res) {

    return (res.locals.connectedUser instanceof User) === true
}

function checkRoles(req, res, roles) {

    const authenticated = isAuthenticated(res)

    for (const level of roles) {

        switch (level) {

            case Roles.ANY:
                return true

            case Roles.ANONYMOUS:
                if (authenticated === false)
                    return true
                break

            case Roles.USER:
                if (authenticated === true)
                    return true
                break
        }
    }

    return false
}

module.exports = roles => {

    if (!Array.isArray(roles))
        roles = [roles]

    for (const role of roles){
        if (!Object.values(Roles).includes(role)){
            throw new Error(`Role ${role} does not exist`)
        }
    }

    return (req, res, next) => {

        if (checkRoles(req, res, roles) !== true){
            res.status(403).json({ errors: [ 'You do not have the required privilege to perform this action' ] })
            return
        }

        next()
    }
}

module.exports.Roles = Roles