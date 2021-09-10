const express = require('express')

const router = express.Router()
const loginController = require('../../controllers/v1/login')
// const validate = require('../../middlewares/validate')
// const { generalValidations } = require('../../validations')

// const { userPermissions } = require('../../permissions')
// const chkPermissions = require('../../middlewares/permissions')

router.post('/login', loginController.login)
router.post('/forgetpassword', loginController.forgetpassword)
router.post('/resetpassword', loginController.resetpassword)
module.exports = router
