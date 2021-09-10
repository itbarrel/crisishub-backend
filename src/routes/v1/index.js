const express = require('express')

const router = express.Router()

const verifyToken = require('../../middlewares/verifyToken')
const { generalValidations } = require('../../validations')

const validate = require('../../middlewares/validate')

const authRoute = require('./logIn')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const departmentRoute = require('./departments')
const verifyAccount = require('../../middlewares/verifyAccount')

const routes = [
    { path: '/users', routes: [validate(generalValidations.headers), verifyAccount, verifyToken, userRoute] },
    { path: '/roles', routes: [validate(generalValidations.headers), verifyAccount, verifyToken, roleRoute] },
    { path: '/accounts', routes: [validate(generalValidations.headers), verifyAccount, verifyToken, accountRoute] },
    { path: '/departments', routes: [validate(generalValidations.headers), verifyAccount, verifyToken, departmentRoute] },
    { path: '/auth', routes: [authRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
