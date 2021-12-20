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
const incidentRoute = require('./incidents')
const taskRoute = require('./tasks')
const colorPaletteRoute = require('./colorpalette')
const customMessageRoute = require('./customMessages')
const scenarioRoute = require('./scenarios')
const categoryRoute = require('./categories')
const actionRoute = require('./actionList')
const categoryMessageRoute = require('./categoryMessages')
const actionListMessageRoute = require('./actionListMessages')
const incomingMessageRoute = require('./incomingMessage')
const messageRoute = require('./message')

const verifyAccount = require('../../middlewares/verifyAccount')
const setDomainFromBody = require('../../middlewares/setDomainFromBody')

const necessaryMiddlewares = [
    validate(generalValidations.headers),
    setDomainFromBody(false),
    verifyAccount,
    verifyUserPermissions,
]

const routes = [
    { path: '/users', routes: [...necessaryMiddlewares, userRoute] },
    { path: '/roles', routes: [...necessaryMiddlewares, roleRoute] },
    { path: '/accounts', routes: [...necessaryMiddlewares, accountRoute] },
    { path: '/departments', routes: [...necessaryMiddlewares, departmentRoute] },
    { path: '/incidents', routes: [...necessaryMiddlewares, incidentRoute] },
    { path: '/tasks', routes: [...necessaryMiddlewares, taskRoute] },
    { path: '/colorpalettes', routes: [...necessaryMiddlewares, colorPaletteRoute] },
    { path: '/customMessages', routes: [...necessaryMiddlewares, customMessageRoute] },
    { path: '/scenarios', routes: [...necessaryMiddlewares, scenarioRoute] },
    { path: '/categories', routes: [...necessaryMiddlewares, categoryRoute] },
    { path: '/actionLists', routes: [...necessaryMiddlewares, actionRoute] },
    { path: '/categoryMessages', routes: [...necessaryMiddlewares, categoryMessageRoute] },
    { path: '/actionListMessages', routes: [...necessaryMiddlewares, actionListMessageRoute] },
    { path: '/incomingMessages', routes: [...necessaryMiddlewares, incomingMessageRoute] },
    { path: '/messages', routes: [...necessaryMiddlewares, messageRoute] },
    { path: '/auth', routes: [authRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
