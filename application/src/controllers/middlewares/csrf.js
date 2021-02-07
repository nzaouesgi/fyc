'use strict'

const crypto = require('crypto')
const util = require('util')

const pRandomBytes = util.promisify(crypto.randomBytes)

module.exports = (req, res, next) => {

    req.generateCsrfToken = async function () {
        const token = (await pRandomBytes(32)).toString('hex')
        this.session.csrfToken = token
        return token
    }

    const whitelistedMethods = ['get', 'head', 'options']

    if (whitelistedMethods.some(method => method === req.method.toLowerCase()) === true) {
        next()
        return
    }

    const suppliedToken = req.headers['x-csrf-token']
    const sessionToken = req.session.csrfToken

    if (typeof sessionToken !== 'string') {
        next(new Error(`No CSRF token in session data`))
        return
    }

    if (typeof suppliedToken !== 'string') {
        next(new Error('No CSRF Token was supplied'))
        return
    }

    if (crypto.timingSafeEqual(Buffer.from(suppliedToken, 'hex'), Buffer.from(sessionToken, 'hex')) !== true) {
        next(new Error('Wrong CSRF token value'))
        return
    }

    next()
}