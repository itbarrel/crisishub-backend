const express = require('express')

const router = express.Router()
const customMessagesController = require('../../controllers/v1/customMessage')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { customMessagePermissions } = require('../../permissions')
const { generalValidations, custommessageValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(customMessagePermissions.all), customMessagesController.all)

router.post('/', validate(custommessageValidations.custommessageObj),
    chkPermissions(customMessagePermissions.create), customMessagesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(customMessagePermissions.get), customMessagesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(custommessageValidations.custommessageObj),
    chkPermissions(customMessagePermissions.update), customMessagesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(customMessagePermissions.delete), customMessagesController.destroy)

module.exports = router
