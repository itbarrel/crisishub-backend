const express = require('express')

const router = express.Router()
const loginController = require('../../controllers/v1/login')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')
const { authValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), authValidations.authObj, loginController.all)
router.post('/', loginController.login)
router.post('/authenticatetest', authValidations.authObj, (red, res) => {
    res.send({ message: 'Authenticate' })
})

module.exports = router
