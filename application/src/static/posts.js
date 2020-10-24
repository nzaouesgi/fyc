'use strict';

(function () {

    const itemsPerPage = 5
    const postsDiv = document.getElementById('posts')

    function createPostElement(post) {

        // DOM based XSS
        const postElement = document.createElement('div')
        const header = document.createElement('div')

        const userImage = document.createElement('img')
        userImage.src = '/static/user.png'
        userImage.height = '25'
        userImage.width = '25'
        userImage.style.display = 'inline'
        userImage.className = 'mr-2'
        
        const title = document.createElement('h5')
        title.innerHTML = post.title
        title.style.fontWeight = 'bold'
        title.style.display = 'inline'

        const userInfo = document.createElement('a')
        userInfo.href = `/users/${post.author.id}`
        userInfo.innerHTML = post.author.username

        const details = document.createElement('small')
        details.append(' by ')
        details.appendChild(userInfo)
        details.append(` at ${new Date(post.createdAt).toLocaleString()}`)
        details.style.display = 'inline'

        const content = document.createElement('p')
        content.innerHTML = post.message

        header.appendChild(userImage)
        header.appendChild(title)
        header.appendChild(details)

        postElement.appendChild(header)
        postElement.appendChild(content)

        return postElement
    }

    async function loadPosts(page) {

        const nextPageButton = document.getElementById('next-page-button')

        nextPageButton.disable()

        const response = await fetch(`/api/posts?limit=${itemsPerPage}&page=${encodeURIComponent(page)}`)

        const { data, count } = await response.json()

        if ((page + 1) * itemsPerPage < count) {
            nextPageButton.onclick = function () {
                loadPosts(page + 1)
            }
            nextPageButton.enable()
        }

        for (const post of data) {
            postsDiv.appendChild(createPostElement(post))
            postsDiv.appendChild(document.createElement('hr'))
        }

    }

    window.addEventListener('load', function () {
        loadPosts(0)
    })

})()