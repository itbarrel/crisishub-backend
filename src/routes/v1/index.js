const express = require('express')

const router = express.Router()

const verifyToken = require('../../middlewares/verifyToken')
const { generalValidations } = require('../../validations')

const validate = require('../../middlewares/validate')

const loginRoute = require('./logIn')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')

const routes = [
    { path: '/users', routes: [validate(generalValidations.headers), verifyToken, userRoute] },
    { path: '/roles', routes: [validate(generalValidations.headers), verifyToken, roleRoute] },
    { path: '/accounts', routes: [validate(generalValidations.headers), verifyToken, accountRoute] },
    { path: '/login', routes: [loginRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
