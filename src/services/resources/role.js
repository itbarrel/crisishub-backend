const models = require('../../models')
const AccountResourceService = require('./accountResource')

class RoleService extends AccountResourceService {
    constructor() {
        super(models.Role)

        this.mainRoles = [
            {
                name: 'Super Admin',
                value: 'super_admin',
                permissions: {
                    Accounts: ['*'],
                    Roles: ['*'],
                    Users: ['*'],
                },
                default: true,
            },
            {
                name: 'Admin',
                value: 'admin',
                permissions: {
                    Roles: ['*'],
                    Users: ['*'],
                },
                default: true,
            },
            {
                name: 'Information Provider',
                value: 'ip',
                permissions: {},
                default: true,
            },
            {
                name: 'Information Manager',
                value: 'im',
                permissions: {},
                default: true,
            },
        ]
    }

    async createDefaultRolesFor(account) {
        return this.mainRoles.forEach(async (role) => {
            await this.model.schema(account.tenant_name).create(role)
        })
    }
}

module.exports = new RoleService()
