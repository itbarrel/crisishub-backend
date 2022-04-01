const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class CategoryService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Category)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 50) {
        const domainModels = models(this.domain)
        const options = {
            where: query,
            page: offset,
            paginate: limit,
            order: [[domainModels.CategoryMessage, 'sortOrder', 'ASC']],
            include: [
                {
                    model: domainModels.CategoryMessage,
                    required: false,
                    include: { model: domainModels.User, required: false },
                },
            ],
        }
        return this.model.paginate(options)
    }
}

module.exports = CategoryService
