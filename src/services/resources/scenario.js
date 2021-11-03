const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class ScenarioService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Scenario)
        this.domain = domain
    }
}

module.exports = ScenarioService
