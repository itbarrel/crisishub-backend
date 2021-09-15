const { RoleService } = require('../resources')

const superAdminRole = {
    name: 'Super Admin',
    value: 'super_admin',
    permissions: {
        Accounts: ['*'],
        Roles: ['*'],
        Users: ['*'],
        Departments: ['*'],
        Incidents: ['*'],
        Tasks: ['*'],
    },
    default: true,
}

const create = async () => RoleService.create(superAdminRole)

const destroy = async () => RoleService.delete(superAdminRole)

module.exports = { create, destroy }
