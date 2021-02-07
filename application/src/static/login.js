'use strict';

(function () {

    function getFormErrors(formData) {

        const errors = []

        if (!validator.isEmail(formData.get('email')))
            errors.push('Email is invalid')

        if (!formData.get('password').length)
            errors.push('Password must not be empty')

        return errors
    }

    async function login(formData) {

        const formEntries = Array.from(formData.entries())
        const formObject = Object.fromEntries(formEntries)

        const response = await fetch('/api/auth/login', {
            body: JSON.stringify(formObject),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })

        const { status } = response

        if (status === 401)
            throw new Error(`Authentication failed`)

        if (status !== 204)
            throw new Error(`An error occured (code=${status})`)
    }

    window.addEventListener('load', function () {

        const formElement = document.getElementById('login-form')
        const submitButton = document.getElementById('login-form-submit')

        submitButton.onclick = function (ev) {

            ev.preventDefault()

            const formData = new FormData(formElement)
            const errors = getFormErrors(formData)

            if (errors.length > 0) {
                alert(errors.join('\r\n'))
                return
            }

            submitButton.disable()

            login(formData)
                .then(() => window.location = document.baseURI)
                .catch(err => alert(err.message))
                .finally(() => submitButton.enable())
        }
    })
})()