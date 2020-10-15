'use strict'

module.exports = (req, res, next) => {

    const encode = (value, format) => {

        if (typeof value !== 'string')
            throw new Error('Value to encode must be a string')
        
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

            output += format(hex)
        }

        return output
    }
    
    res.locals.encodeForHtml = (value) => encode(value, hex => `&#x${hex};`)
    res.locals.encodeForJavascript = (value) => encode(value, hex => `\\x${hex}`)
    res.locals.encodeForUrlParameter = (value) => encode(value, hex => `%${hex}`)

    next()
}