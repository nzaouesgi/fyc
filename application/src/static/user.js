'use strict';

(function (){

    window.addEventListener("load", function (){

        const user = document.getElementById

        (async () => {

            const foundUser = await fetch(`/api/users/${user.id}`)

        })()

        .catch(err => alert(err.message))

    })

})()