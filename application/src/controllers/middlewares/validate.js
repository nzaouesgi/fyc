'use strict'

module.exports = (schema, target = 'body') => {
    return (req, res, next) => {
        
        const validation = schema.validate(req[target])

        if (!validation.error){
            next()
            return
        }

        res.status(400).json({ errors: validation.error.details.map(e => e.message) })
    }
}