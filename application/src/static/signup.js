'use strict';

(function (){

    window.addEventListener('load', function (){

        function getFormErrors(formData) {

            const errors = []

            if (formData.get('username').length === 0)
                errors.push('Username must not be empty')

            if (formData.get('password').length === 0)
                errors.push('Password must not be empty')

            if (formData.get('password-confirmation') !== formData.get('password'))
                errors.push('Password confirmation is invalid')

            if (!validator.isEmail(formData.get('email')))
                errors.push('Email is invalid')
    
            return errors
        }
    
        async function signup(formData) {
    
            const formEntries = Array.from(formData.entries())
            const formObject = Object.fromEntries(formEntries)
    
            const response = await fetch('/api/users/', {
                body: JSON.stringify(formObject),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            })
    
            const { status } = response

            if (status === 403){
                throw new Error(`${(await response.json()).error}`)
            }
    
            if (status !== 201)
                throw new Error(`An error occured (code=${status})`)
        }
    
        const formElement = document.getElementById('signup-form')
        const submitButton = document.getElementById('signup-form-submit')

        console.log(submitButton)

        submitButton.onclick = function (ev) {

            ev.preventDefault()

            const formData = new FormData(formElement)
            const errors = getFormErrors(formData)

            if (errors.length > 0) {
                alert(errors.join('\r\n'))
                return
            }

            submitButton.disable()

            signup(formData)
                .then(() => window.location = document.baseURI + '/login')
                .catch(err => alert(err.message))
                .finally(() => submitButton.enable())
        }
    })

})()