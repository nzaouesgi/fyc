'use strict'

Promise.all(require('./loaders').map(l => l()))
    .then(() => console.log('All modules loaded.'))
    .catch(console.error) 