const express = require('express')

const router = express.Router()
const MessagesController = require('../../controllers/v1/message')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { messagePermissions } = require('../../permissions')
const { generalValidations, messageValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(messagePermissions.all), MessagesController.all)

router.post('/', validate(messageValidations.messageObj),
    chkPermissions(messagePermissions.create), MessagesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(messagePermissions.get), MessagesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(messageValidations.messageObj),
    chkPermissions(messagePermissions.update), MessagesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(messagePermissions.delete), MessagesController.destroy)

module.exports = router
