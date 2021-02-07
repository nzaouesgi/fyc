'use strict'

const moment = require('moment')

module.exports = {
    currentSqlTimestamp: () => moment().format('YYYY-MM-DD HH:MM:SS')
}