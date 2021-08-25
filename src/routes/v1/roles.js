const express = require('express')

const router = express.Router()
const rolesController = require('../../controllers/v1/roles')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), rolesController.all)
router.post('/', rolesController.create)
router.put('/:id', validate(generalValidations.getResource), rolesController.update)
router.delete('/:id', validate(generalValidations.getResource), rolesController.destroy)

module.exports = router
