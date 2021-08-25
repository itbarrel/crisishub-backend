const express = require('express')

const router = express.Router()
const config = require('../../config')

const v1Routes = require('./v1')

const main = (req, res) => {
    res.send('Node Express Service available')
}

const defaultRoutes = [
    { path: '/v1/', route: v1Routes },
    { path: '/', route: main },
]

// routes available only in development mode
const devRoutes = [
    // { path: '/docs', route: docsRoute }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route)
    })
}

module.exports = router
