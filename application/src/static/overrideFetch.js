'use strict'

window.fetch = (function (originalFetch){

    return function fetch (){

        const url = 0, init = 1

        const args = [ 
            arguments[url], 
            typeof arguments[init] === 'object' ? arguments[init] : {} 
        ]

        if ((args[init].headers instanceof Headers) !== true){

            const headers = new Headers() 

            if (typeof args[init].headers === 'object'){
                Object.entries(args[init].headers).forEach(entry => headers.set(...entry))
            }

            args[init].headers = headers
        }
        
        const csrfTokenMetaTag = document.querySelector('meta[name="csrf-token"]')
        
        if ((csrfTokenMetaTag instanceof HTMLMetaElement) === true){

            const csrfToken = csrfTokenMetaTag.getAttribute('content')

            if (typeof csrfToken === 'string'){

                const { method } = args[init]

                if (typeof method === 'string' && [ 'get', 'head', 'options' ].includes(method.toLowerCase()) !== true){
                    
                    if (typeof csrfToken === 'string'){
                        args[init].headers.set('x-csrf-token', csrfToken)
                    }
                }
            }
        }

        if (args[init].credentials !== 'string')
            args[init].credentials = 'same-origin'

        return originalFetch.apply(this, args)

    }

})(window.fetch)