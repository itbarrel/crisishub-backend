const { RoleService, UserService } = require('../resources')

const create = async () => {
    const role = await RoleService.findByQuery({ value: 'super_admin' })

    const superAdmin = {
        userName: 'SuperAdmin',
        email: 'superadmin@crisishub.com',
        password: 'crisishub12345',
        firstName: 'Super',
        lastName: 'Admin',
        RoleId: role.id,
    }

    await UserService.create(superAdmin)
}

const destroy = async () => UserService.delete({})

module.exports = { create, destroy }
