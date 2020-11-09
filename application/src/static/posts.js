'use strict';

(function () {

    const itemsPerPage = 5
    const postsDiv = document.getElementById('posts')

    const connectedUserMeta = document.querySelector('meta[name="connected-user"]')

    async function deletePost(post){

        const response = await fetch(`/api/posts/${post.id}`, {
            method: 'DELETE'  
        })

        if (response.status !== 204){

            const json = await response.json()

            if (Array.isArray(json.errors))
                throw new Error(json.errors.join('\r\n'))
            else
                throw new Error('Something wrong happened')
        }

        document.location = '/'
    }

    function createPostElement(post) {

        // DOM based XSS
        const postElement = document.createElement('div')
        const header = document.createElement('div')

        const userImage = document.createElement('img')
        userImage.src = post.author.picture ?  `/static/user_img/${post.author.picture}` : '/static/user.png'
        userImage.style.borderRadius = '25px'
        userImage.height = '50'
        userImage.width = '50'
        userImage.style.display = 'inline'
        userImage.style.objectFit = 'cover'
        userImage.className = 'mr-2'
        
        const title = document.createElement('h5')
        title.innerHTML = post.title
        title.style.fontWeight = 'bold'
        title.style.display = 'inline'

        const userInfo = document.createElement('a')
        userInfo.href = `/users/${post.author.id}`
        userInfo.textContent = post.author.username

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
        
        if (connectedUserMeta !== null ){

            const userId = connectedUserMeta.getAttribute('content')

            if (post.authorId === userId){

                const deleteButton = document.createElement('button')
                deleteButton.className = 'btn btn-outline-danger'
                deleteButton.style.display = "block"
                deleteButton.textContent = 'Delete post'
                
                deleteButton.onclick = function (){
                    deletePost(post)
                        .catch(err => alert(err.message))
                }
                
                postElement.appendChild(deleteButton)
            }
        }

        return postElement
    }

    async function loadPosts(page) {

        const nextPageButton = document.getElementById('next-page-button')

        nextPageButton.disable()

        const response = await fetch(`/api/posts?limit=${itemsPerPage}&page=${encodeURIComponent(page)}`)

        const json = await response.json()

        if (response.status !== 200){
            
            if (Array.isArray(json.errors))
                throw new Error(json.errors.join('\r\n'))
            else
                throw new Error('Something wrong happened')
        }

        const { data, count } = json

        if ((page + 1) * itemsPerPage < count) {
            nextPageButton.onclick = function () {
                loadPosts(page + 1)
                    .catch(err => alert(err.message))
            }
            nextPageButton.enable()
        }

        if (page === 0 && data.length === 0){
            postsDiv.innerHTML = "<p>No posts</p>"
        }

        for (const post of data) {
            postsDiv.appendChild(createPostElement(post))
            postsDiv.appendChild(document.createElement('hr'))
        }

    }

    window.addEventListener('load', function () {
        loadPosts(0)
            .catch(err => alert(err.message))
    })

})()