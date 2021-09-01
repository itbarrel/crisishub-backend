const express = require('express')

const router = express.Router()
const loginController = require('../../controllers/v1/login')
// const validate = require('../../middlewares/validate')
// const { generalValidations } = require('../../validations')
// const { authValidations } = require('../../validations')
// const permissionsCheck = require('../../middlewares/permissions')

// router.get('/', validate(generalValidations.allResources),
// authValidations.authObj, loginController.all)
// router.get('/', permissionsCheck, loginController.all)
router.post('/', loginController.login)
// router.post('/authenticatetest', permissionsCheck([
//     {
//         actionsTocheck: [
//             'update',
//             'create',
//         ],
//         entity: 'video_recordings',
//     },
// ]), (red, res) => {
//     res.send({ message: 'Authenticate' })
// })// done

module.exports = router
