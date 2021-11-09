const express = require('express')

const router = express.Router()
const departmentsController = require('../../controllers/v1/department')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { departmentPermissions } = require('../../permissions')
const { generalValidations, departmentValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(departmentPermissions.all), departmentsController.all)

router.post('/', validate(departmentValidations.departmentObj),
    chkPermissions(departmentPermissions.create), departmentsController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(departmentPermissions.get), departmentsController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(departmentValidations.departmentObj),
    chkPermissions(departmentPermissions.update), departmentsController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(departmentPermissions.delete), departmentsController.destroy)

module.exports = router
