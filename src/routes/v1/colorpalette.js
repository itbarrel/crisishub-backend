const express = require('express')

const router = express.Router()
const colorpalettesController = require('../../controllers/v1/colorPalette')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { colorpalettePermissions } = require('../../permissions')
const { generalValidations, colorpaletteValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(colorpalettePermissions.all), colorpalettesController.all)

router.post('/', validate(colorpaletteValidations.colorpaletteObj),
    chkPermissions(colorpalettePermissions.create), colorpalettesController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(colorpalettePermissions.get), colorpalettesController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(colorpaletteValidations.colorpaletteObj),
    chkPermissions(colorpalettePermissions.update), colorpalettesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(colorpalettePermissions.delete), colorpalettesController.destroy)

module.exports = router
