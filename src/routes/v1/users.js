const express = require('express')

const router = express.Router()
const usersController = require('../../controllers/v1/users')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')
const { userPermissions } = require('../../permissions')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(userPermissions.all), usersController.all)

router.post('/', chkPermissions(userPermissions.create), usersController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(userPermissions.get), usersController.show)

router.put('/:id',
    validate(generalValidations.getResource),
    chkPermissions(userPermissions.update), usersController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(userPermissions.delete), usersController.destroy)

module.exports = router
