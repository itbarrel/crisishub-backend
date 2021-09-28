const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')
const RoleService = require('./role')

class UserService extends ResourceService {
    constructor() {
        const decoded = storage.get('decoded')
        const { domain } = decoded
        const schemaModels = models(domain)
        super(schemaModels.User)
    }

    async createDefaultUsersFor(account, userObj) {
        const role = await RoleService.findByQuery({ value: 'admin' })
        userObj.RoleId = role.id
        await this.model.schema(account.tenant_name).create(userObj)
    }
}

module.exports = UserService
