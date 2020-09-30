'use strict'

const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname))

app.use((req, res, next) => {
    console.log(1)
    next()
})

app.get('/helloworld', (req, res) => {

    const user = req.query.user

    if (user === undefined){
        res.end('Erreur !')
        return
    }

    res.render('accueil', { user })
})

app.listen(80, () => {
    console.log('server is listening')
})