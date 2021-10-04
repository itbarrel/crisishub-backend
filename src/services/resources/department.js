const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class DepartmentService extends ResourceService {
    constructor() {
        const decoded = storage.get('decoded')
        const { domain } = decoded
        const schemaModels = models(domain)
        super(schemaModels.Department)
    }
}

module.exports = DepartmentService
