'use strict'

const app = require('./constants/express')
const sequelize = require('./constants/sequelize')

app.listen(80, () => {
    console.log('server is listening')
})