'use strict'

const errorHandler = (err, req, res, next) => {

    console.error(err.stack)

    const error = process.env.NODE_ENV === 'development' ? err.message : 'Something wrong happened'

    if (req.path.startsWith('/api/')){

        res.status(500).json({ errors: [ error ] })
        return
    }

    res.status(500).render('error', { error: error })
}   

const notFoundHandler = (req, res, next) => {
    res.status(404).render('error', { error: 'Page could not be found.' })
}

const apiNotFoundHandler = (req , res, next) => {
    res.status(404).json({ errors: [ 'Endpoint does not exist' ] })
}

module.exports = { errorHandler, notFoundHandler, apiNotFoundHandler }