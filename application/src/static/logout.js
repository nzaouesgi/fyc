'use strict';

(function () {

    window.addEventListener('load', function () {

        fetch('/api/auth/logout', {
            method: 'DELETE'
        })

            .finally(() => {
                window.location = document.baseURI
            })

    })

}())