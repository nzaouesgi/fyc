'use strict'

const { Router } = require('express')

function createFrontRouter () {

    const router = Router()

    router.use((req, res, next) => {
        
        res.locals.encodeForHtml = (value) => {
    
            let output = ''

            const isWhitelist = char => char.charCodeAt(0) >= 256 || /^[a-zA-Z0-9]$/.test(char)

            for (const c of value){
                
                if (isWhitelist(c)){
                    output += c
                    continue
                }

                const hex = c.charCodeAt(0)
                    .toString(16)
                    .padStart(2, '0')
                    .toUpperCase()

                output += `&#x${hex};`
            }

            return output
        }

        res.locals.encodeForJavascript = (value) => {
    
            let output = ''

            const isWhitelist = char => char.charCodeAt(0) >= 256 || /^[a-zA-Z0-9]$/.test(char)

            for (const c of value){
                
                if (isWhitelist(c)){
                    output += c
                    continue
                }

                const hex = c.charCodeAt(0)
                    .toString(16)
                    .padStart(2, '0')
                    .toUpperCase()

                output += `\\x${hex}`
            }

            return output
        }

        next()
    })

    router.get('/', (req, res, next) => {

        const foo = req.query.foo

        res.render('index', { foo })
    })

    return router
}

module.exports = createFrontRouter