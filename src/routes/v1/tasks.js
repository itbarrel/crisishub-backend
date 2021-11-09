const express = require('express')

const router = express.Router()
const tasksController = require('../../controllers/v1/tasks')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { taskPermissions } = require('../../permissions')
const { generalValidations, taskValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(taskPermissions.all), tasksController.all)

router.post('/', validate(taskValidations.taskoObj),
    chkPermissions(taskPermissions.create), tasksController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(taskPermissions.get), tasksController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(taskValidations.taskoObj),
    chkPermissions(taskPermissions.update), tasksController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(taskPermissions.delete), tasksController.destroy)

module.exports = router
