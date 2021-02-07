'use strict'

module.exports = logics => {

    logics = Array.isArray(logics) ? logics : [logics]

    return async (req, res, next) => {

        const deny = e => {
            res.status(403).json({ 
                errors: [ 
                    e instanceof Error ? e.message : 'Your are not allowed to perform this action.'  
                ] 
            })
        }
 
        try {

            for (const logic of logics) {

                let result = logic(req, res)

                if (result instanceof Promise)
                    result = await result

                if (typeof result === 'boolean' && result === true) {
                    next()
                    return
                }
            }

            deny()

        } catch (e) { deny(e) }
    }
}