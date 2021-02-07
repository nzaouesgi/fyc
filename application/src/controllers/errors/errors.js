'use strict'

const errorHandler = (err, req, res, next) => {

    console.error(err.stack)

    if (req.path.startsWith('/api/')){
        res.status(500).json({ 
            errors: [ 
                (process.env.NODE_ENV === 'development' ? err.message : 'Something wrong happened') 
            ] 
        })
        return
    }

    res.status(500).render('error', { 
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
}   

const notFoundHandler = (req, res, next) => {
    res.status(404).render('error', { error: 'Page could not be found.' })
}

const apiNotFoundHandler = (req , res, next) => {
    res.status(404).json({ errors: [ 'Endpoint does not exist' ] })
}

module.exports = { errorHandler, notFoundHandler, apiNotFoundHandler }