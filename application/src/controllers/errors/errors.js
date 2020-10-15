'use strict'

const errorHandler = (err, req, res, next) => {
    console.error(err)
    res.status(500).end(`Something wrong happened (${err.message})`)
}   

const notFoundHandler = (req, res, next) => {
    res.status(404).end('Not found')
}

module.exports = { errorHandler, notFoundHandler }