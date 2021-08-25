const express = require('express')

const router = express.Router()

const usersController = require('../../controllers/v1/users')

const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), usersController.all)
router.post('/', usersController.create)
// router.delete('/:id', validate(generalValidations.getResource), usersController.destroy)

module.exports = router
