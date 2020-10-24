'use strict'

const fs = require('fs')

Promise.all(require('./loaders').map(l => l()))
    .then(() => console.log('All modules loaded.'))
    .catch(console.error)