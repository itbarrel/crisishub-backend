const express = require('express')

const router = express.Router()
const actionListsController = require('../../controllers/v1/actionList')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { actionListPermissions } = require('../../permissions')
const { generalValidations, actionListValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(actionListPermissions.all), actionListsController.all)

router.post('/', validate(actionListValidations.actionListsObj),
    chkPermissions(actionListPermissions.create), actionListsController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(actionListPermissions.get), actionListsController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(actionListValidations.actionListsObj),
    chkPermissions(actionListPermissions.update), actionListsController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(actionListPermissions.delete), actionListsController.destroy)

module.exports = router
