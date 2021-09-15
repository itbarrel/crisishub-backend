const models = require('../../models')
const AccountResourceService = require('./accountResource')

class IncidentService extends AccountResourceService {
    constructor() {
        super(models.Incident)
    }
}

module.exports = new IncidentService()
