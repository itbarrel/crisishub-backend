const models = require('../../models')
const ResourceService = require('./resource')
const RoleService = require('./role')

class AccountService extends ResourceService {
    constructor() {
        super(models.Account)
    }

    async create(obj = {}) {
        const account = await this.model.create(obj)
        await RoleService.createDefaultRolesFor(account)
        return account
    }
}

module.exports = new AccountService()
