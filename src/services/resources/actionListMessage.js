const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class ActionListMessageService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.ActionListMessage)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 50) {
        query.parentType = 'actionListMessage'
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            include: ['ActionList'],
        }
        return this.model.paginate(options)
    }
}

module.exports = ActionListMessageService
