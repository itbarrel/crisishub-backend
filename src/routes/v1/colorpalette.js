const express = require('express')

const router = express.Router()
const colorpalettesController = require('../../controllers/v1/colorPalette')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { generalValidations } = require('../../validations')
const { colorpalettePermissions } = require('../../permissions')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(colorpalettePermissions.all), colorpalettesController.all)

router.post('/', chkPermissions(colorpalettePermissions.create), colorpalettesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(colorpalettePermissions.get), colorpalettesController.show)

router.put('/:id',
    validate(generalValidations.getResource),
    chkPermissions(colorpalettePermissions.update), colorpalettesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(colorpalettePermissions.delete), colorpalettesController.destroy)

module.exports = router
