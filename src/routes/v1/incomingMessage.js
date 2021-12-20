const express = require('express')

const router = express.Router()
const incomingMessagesController = require('../../controllers/v1/incomingMessage')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { incomingMessagePermissions } = require('../../permissions')
const { generalValidations, incomingMessageValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(incomingMessagePermissions.all), incomingMessagesController.all)

router.post('/', validate(incomingMessageValidations.incomingMessageObj),
    chkPermissions(incomingMessagePermissions.create), incomingMessagesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(incomingMessagePermissions.get), incomingMessagesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(incomingMessageValidations.incomingMessageObj),
    chkPermissions(incomingMessagePermissions.update), incomingMessagesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(incomingMessagePermissions.delete), incomingMessagesController.destroy)

module.exports = router
