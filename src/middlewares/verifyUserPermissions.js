const storage = require('../utils/cl-storage')

const { UserService, RoleService } = require('../services/resources')

const verifyUserPermissions = async (req, res, next) => {
    storage.run(async () => {
        try {
            const decoded = storage.get('decoded')
            const user = await UserService.findByQuery({ userName: decoded.userName })
            if (user) {
                const role = await RoleService.findByQuery({ id: user.RoleId }, true)
                storage.set('user', user)
                storage.set('role', role)
                next()
            } else {
                throw Error('Invalid User Token')
            }
        } catch (error) {
            next(error)
        }
    })
}

module.exports = verifyUserPermissions
