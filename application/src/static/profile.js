'use strict';

(function (){

    window.addEventListener('load', function (){

        const form = document.getElementById('profile-form')
        const submit = document.getElementById('profile-form-submit')

        const userId = document.getElementById('user-id').innerHTML

        function getFormErrors (formData){
            const errors = []

            if (formData.get('username').length === 0){
                errors.push('Username must not be empty')
            }

            const file = formData.get('picture')

            if (file){

                if (file.size === 0){
                    formData.delete('picture')
                }

                else if (file.type !== 'image/jpeg' && file.type !== 'image/png'){
                    errors.push('Bad picture format. You must provide jpg or png file.')
                }
            }

            return errors
        }

        async function updateProfile (formData){

            const response = await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                body: formData
            })

            const json = await response.json()

            if (response.status !== 200){
                throw new Error(json.errors ? json.errors.join('\r\n')  : 'Something wrong happened')
            }

            const updatedUser = json

            return updatedUser
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

            updateProfile(formData)
                .then(newData => window.location = '/profile')
                .catch(err => alert(err.message))
                .finally(() => submit.enable())
        }

    })

})()