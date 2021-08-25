const express = require('express')

const router = express.Router()

const verifyAccount = require('../../middlewares/verifyAccount')
const { generalValidations } = require('../../validations')

const validate = require('../../middlewares/validate')

const loginRoute = require('./logIn')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')

const routes = [
    { path: '/users', routes: [validate(generalValidations.headers), verifyAccount, userRoute] },
    { path: '/roles', routes: [validate(generalValidations.headers), verifyAccount, roleRoute] },
    { path: '/accounts', routes: [accountRoute] },
    { path: '/login', routes: [loginRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
