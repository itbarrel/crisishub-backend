const express = require('express')

const router = express.Router()

const verifyUserPermissions = require('../../middlewares/verifyUserPermissions')
const { generalValidations } = require('../../validations')

const validate = require('../../middlewares/validate')

const authRoute = require('./auth')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const departmentRoute = require('./departments')

const verifyAccount = require('../../middlewares/verifyAccount')
const setDomainFromBody = require('../../middlewares/setDomainFromBody')

const necessaryMiddlewares = [
    validate(generalValidations.headers),
    setDomainFromBody(false),
    verifyAccount,
    verifyUserPermissions,
]

const routes = [
    {
        path: '/users',
        routes: [...necessaryMiddlewares, userRoute],
    },
    { path: '/roles', routes: [...necessaryMiddlewares, roleRoute] },
    { path: '/accounts', routes: [...necessaryMiddlewares, accountRoute] },
    { path: '/departments', routes: [...necessaryMiddlewares, departmentRoute] },
    { path: '/auth', routes: [authRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
