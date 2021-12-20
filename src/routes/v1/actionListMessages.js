const express = require('express')

const router = express.Router()
const actionListMessagesController = require('../../controllers/v1/actionListMessage')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { actionListMessagePermissions } = require('../../permissions')
const { generalValidations, actionListMessageValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(actionListMessagePermissions.all), actionListMessagesController.all)

router.post('/', validate(actionListMessageValidations.actionListMessageObj),
    chkPermissions(actionListMessagePermissions.create), actionListMessagesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(actionListMessagePermissions.get), actionListMessagesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(actionListMessageValidations.actionListMessageObj),
    chkPermissions(actionListMessagePermissions.update), actionListMessagesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(actionListMessagePermissions.delete), actionListMessagesController.destroy)

module.exports = router
