const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class Messageservice extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Message)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 50) {
        query.parentType = 'message'
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
        }
        return this.model.paginate(options)
    }
}

module.exports = Messageservice
