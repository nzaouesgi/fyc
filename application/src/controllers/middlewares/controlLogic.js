'use strict'

module.exports = logics => {

    logics = Array.isArray(logics) ? logics : [logics]

    return async (req, res, next) => {

        const deny = e => {
            res.status(403).json({ 
                errors: [ 
                    e instanceof Error ? e.message : 'Your are not allowed to performed this action.'  
                ] 
            })
        }
 
        try {

            for (const logic of logics) {

                let res = logic(req, res)

                if (res instanceof Promise)
                    res = await res

                if (typeof res === 'boolean' && res === true) {
                    next()
                    return
                }
            }

            deny()

        } catch (e) { deny(e) }
    }
}