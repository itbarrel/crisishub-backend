const express = require('express')

const router = express.Router()
const taskListsController = require('../../controllers/v1/taskLists')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')
const { tasklistPermissions } = require('../../permissions')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(tasklistPermissions.all), taskListsController.all)

router.post('/', chkPermissions(tasklistPermissions.create), taskListsController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(tasklistPermissions.get), taskListsController.show)

router.put('/:id',
    validate(generalValidations.getResource),
    chkPermissions(tasklistPermissions.update), taskListsController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(tasklistPermissions.delete), taskListsController.destroy)

module.exports = router
