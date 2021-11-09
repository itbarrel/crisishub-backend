const express = require('express')

const router = express.Router()
const scenariosController = require('../../controllers/v1/scenario')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { scenarioPermissions } = require('../../permissions')
const { generalValidations, scenarioValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(scenarioPermissions.all), scenariosController.all)

router.post('/', validate(scenarioValidations.scenarioObj),
    chkPermissions(scenarioPermissions.create), scenariosController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(scenarioPermissions.get), scenariosController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(scenarioValidations.scenarioObj),
    chkPermissions(scenarioPermissions.update), scenariosController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(scenarioPermissions.delete), scenariosController.destroy)

module.exports = router
