'use strict'

const app = require('../constants/express')

const appLoader = async () => {
    app.listen(80)
}

module.exports = appLoader