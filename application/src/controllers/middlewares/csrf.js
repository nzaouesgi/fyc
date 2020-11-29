'use strict'

const crypto = require('crypto')
const util = require('util')

const pRandomBytes = util.promisify(crypto.randomBytes)

// This must be in .env
const acceptableOrigins = [ 'postbin.local' ]

if (process.env.NODE_ENV !== 'production'){
    acceptableOrigins.push('127.0.0.1', 'localhost')
}

module.exports = (req, res, next) => {

    req.generateCsrfToken = async function () {
        const token = (await pRandomBytes(32)).toString('hex')
        this.session.csrfToken = token
        return token
    }

    const whitelistedMethods = ['get', 'head', 'options']

    if (whitelistedMethods.includes(req.method.toLowerCase()) === true) {
        next()
        return
    }

    // Origin/Referrer check (hardening)
    const checkOrigin  = url => typeof url === 'string' && acceptableOrigins.includes((new URL(url)).hostname)

    if (checkOrigin(req.headers['origin']) !== true && checkOrigin(req.headers['referrer']) !== true)
        throw new Error('Bad referrer check')

    // CSRF Token check
    const suppliedToken = req.headers['x-csrf-token']
    const sessionToken = req.session.csrfToken

    if (typeof sessionToken !== 'string') 
        throw new Error(`No CSRF token in session data`)

    if (typeof suppliedToken !== 'string') 
        throw new Error('No CSRF Token was supplied')

    if (crypto.timingSafeEqual(Buffer.from(suppliedToken, 'hex'), Buffer.from(sessionToken, 'hex')) !== true) 
        throw new Error('Wrong CSRF token value')
    
    next()
}