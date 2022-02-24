const express = require('express')

const router = express.Router()
const categoryMessagesController = require('../../controllers/v1/categoryMessage')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { categoryMessagePermissions } = require('../../permissions')
const {
    generalValidations,
    categoryMessageValidations,
} = require('../../validations')

router.get(
    '/',
    validate(generalValidations.allResources),
    chkPermissions(categoryMessagePermissions.all),
    categoryMessagesController.all,
)

router.post(
    '/',
    validate(categoryMessageValidations.categoryMessageObj),
    chkPermissions(categoryMessagePermissions.create),
    categoryMessagesController.create,
)

router.get(
    '/:id',
    validate(generalValidations.getResource),
    chkPermissions(categoryMessagePermissions.get),
    categoryMessagesController.show,
)
router.put(
    '/:id/sortOrder',
    validate(generalValidations.getResource),
    categoryMessagesController.sortOrder,
)
router.put(
    '/:id',
    validate(generalValidations.getResource),
    validate(categoryMessageValidations.categoryMessageObj),
    chkPermissions(categoryMessagePermissions.update),
    categoryMessagesController.update,
)
router.delete(
    '/:id',
    validate(generalValidations.getResource),
    chkPermissions(categoryMessagePermissions.delete),
    categoryMessagesController.destroy,
)

module.exports = router
