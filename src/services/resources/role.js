const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class RoleService extends ResourceService {
    constructor() {
        const decoded = storage.get('decoded')
        const { domain } = decoded
        const schemaModels = models(domain)
        super(schemaModels.Role)

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

module.exports = RoleService
