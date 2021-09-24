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
                    Tasks: ['*'],
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

        this.entities = ['Roles', 'Users', 'Departments', 'Incidents', 'Tasks']
        this.operations = ['*', 'view', 'create', 'update', 'delete']
    }

    async createDefaultRolesFor(account) {
        return Promise.all(this.mainRoles.map(async (role) => {
            await this.model.schema(account.tenant_name).create(role)
        }))
    }

    async getPermissionEntities() {
        const { operations, entities } = this
        return { operations, entities }
    }
}

module.exports = new RoleService()
