const express = require('express')

const router = express.Router()
const rolesController = require('../../controllers/v1/roles')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')
const chkPermissions = require('../../middlewares/permissions')
const { rolePermissions } = require('../../permissions')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(rolePermissions.all), rolesController.all)

router.post('/', chkPermissions(rolePermissions.create), rolesController.create)

router.put('/:id', validate(generalValidations.getResource),
    chkPermissions(rolePermissions.update), rolesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(rolePermissions.delete), rolesController.destroy)

router.get('/permissions', chkPermissions(rolePermissions.all), rolesController.entities)

module.exports = router
