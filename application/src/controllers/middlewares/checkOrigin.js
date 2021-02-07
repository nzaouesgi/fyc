'use strict'

// This must be in .env
const acceptableOrigins = [ '127.0.0.1', 'postbin.local' ]

module.exports = (req, res, next) => {

    const check  = header => typeof header === 'string' && acceptableOrigins.includes(hostname(origin))

    const hostname = url => new URL(url).hostname

    const { origin, referrer } = req.headers

    if (check(referrer) === true || check(origin) === true){
        next()
        return
    }

    throw new Error('Bad referrer check')
}