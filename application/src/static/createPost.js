'use strict';

(function (){

    window.addEventListener('load', function (){

        const form = document.getElementById('create-thread-form')
        const submit = document.getElementById('create-thread-submit')

        async function createThread (formData){

            const formEntries = Array.from(formData.entries())
            const formObject = Object.fromEntries(formEntries)

            let errMsg = 'Something wrong happened'

            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(formObject),
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })

            const json = await response.json()

            if (response.status !== 201){
                
                if (Array.isArray(json.errors))
                    errMsg = json.errors[0]
                
                throw new Error(errMsg) 
            }

            const thread = json

            return thread
        }

        function getFormErrors (formData) {

            const errors = []

            if (formData.get('title').length === 0){
                errors.push('Title must not be empty')
            }

            if (formData.get('message').length === 0){
                errors.push('Message must not be empty')
            }

            return errors
        }

        submit.onclick = function (ev){
            
            ev.preventDefault()

            const formData = new FormData(form)

            const errors = getFormErrors(formData)

            if (errors.length){
                alert(errors.join('\r\n'))
                return
            }

            submit.disable()

            createThread(formData)
                .then(thread => window.location = document.baseURI)
                .catch(err => alert(err.message))
                .finally(() => submit.enable())
        }


    })


})()