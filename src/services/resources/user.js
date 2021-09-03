const models = require('../../models')

const AccountResourceService = require('./accountResource')
const RoleService = require('./role')

class UserService extends AccountResourceService {
    constructor() {
        super(models.User)
    }

    async createDefaultUsersFor(account, userObj) {
        const role = await RoleService.findByQuery({ value: 'admin' })
        userObj.RoleId = role.id
        await this.model.schema(account.tenant_name).create(userObj)
    }
}

module.exports = new UserService()
