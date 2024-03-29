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
        ColorPalettes: ['*'],
        CustomMessages: ['*'],
        Scenarios: ['*'],
        TaskLists: ['*'],
    },
    default: true,
}
const Role = new RoleService('public')

const create = async () => Role.create(superAdminRole)

const destroy = async () => Role.delete(superAdminRole)

module.exports = { create, destroy }
