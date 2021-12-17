const express = require('express')

const router = express.Router()
const categoriesController = require('../../controllers/v1/category')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { categoryPermissions } = require('../../permissions')
const { generalValidations, categoryValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(categoryPermissions.all), categoriesController.all)

router.post('/', validate(categoryValidations.categoryObj),
    chkPermissions(categoryPermissions.create), categoriesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(categoryPermissions.get), categoriesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(categoryValidations.categoryObj),
    chkPermissions(categoryPermissions.update), categoriesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(categoryPermissions.delete), categoriesController.destroy)

module.exports = router
