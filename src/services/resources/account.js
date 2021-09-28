const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')
const RoleService = require('./role')
const UserService = require('./user')

class AccountService extends ResourceService {
    constructor() {
        const decoded = storage.get('decoded')
        const { domain } = decoded
        const schemaModels = models(domain)
        super(schemaModels.Account)
    }

    async create(obj = {}) {
        try {
            const { admin, ...accountObj } = obj
            const account = await this.model.create(accountObj)
            storage.set('account', account)

            await RoleService.createDefaultRolesFor(account)
            await UserService.createDefaultUsersFor(account, admin)

            return account
        } catch (error) {
            return error
        }
    }
}

module.exports = AccountService
