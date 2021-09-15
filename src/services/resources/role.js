const models = require('../../models')
const AccountResourceService = require('./accountResource')

class RoleService extends AccountResourceService {
    constructor() {
        super(models.Role)

        this.mainRoles = [
            {
                name: 'Admin',
                permissions: {
                    Roles: ['*'],
                    Users: ['*'],
                    Departments: ['*'],
                    Incidents: ['*'],
                },
                default: true,
            },
            {
                name: 'Information Provider',
                permissions: {},
                default: true,
            },
            {
                name: 'Information Manager',
                permissions: {},
                default: true,
            },
        ]
    }

    async createDefaultRolesFor(account) {
        return Promise.all(this.mainRoles.map(async (role) => {
            await this.model.schema(account.tenant_name).create(role)
        }))
    }
}

module.exports = new RoleService()
