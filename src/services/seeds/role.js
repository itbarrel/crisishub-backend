const { RoleService } = require('../resources')
const storage = require('../../utils/cl-storage')

const mainRoles = [
    {
        name: 'Super Admin',
        value: 'super_admin',
        permissions: {
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

const create = async (account) => {
    storage.run(() => {
        storage.set('account', account)

        mainRoles.forEach(async (role) => {
            await RoleService.create(role)
        })
    })
}

const destroy = async () => {
    await RoleService.delete({})
}

module.exports = { create, destroy }
