const express = require('express')

const router = express.Router()
const incidentsController = require('../../controllers/v1/incident')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { incidentPermissions } = require('../../permissions')
const { generalValidations, incidentValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(incidentPermissions.all), incidentsController.all)

router.post('/', validate(incidentValidations.incidentObj),
    chkPermissions(incidentPermissions.create), incidentsController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(incidentPermissions.get), incidentsController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(incidentValidations.incidentObj),
    chkPermissions(incidentPermissions.update), incidentsController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(incidentPermissions.delete), incidentsController.destroy)

module.exports = router
