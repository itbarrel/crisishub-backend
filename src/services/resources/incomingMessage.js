const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class IncomingMessageService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.IncomingMessage)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 50) {
        const options = {
            where: query,
            page: offset,
            paginate: limit,
        }
        return this.model.paginate(options)
    }
}

module.exports = IncomingMessageService
