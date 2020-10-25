'use strict'

const errorHandler = (err, req, res, next) => {
    console.error(err)
    res.status(500).render('error', { error: err.stack })
}   

const notFoundHandler = (req, res, next) => {
    res.status(404).render('error', { error: 'Page could not be found.' })
}

module.exports = { errorHandler, notFoundHandler }