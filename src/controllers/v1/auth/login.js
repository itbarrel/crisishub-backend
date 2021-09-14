const jwt = require('jsonwebtoken')
const { UserService, RoleService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const login = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const { credentials } = req.body

        const user = await UserService.findByQuery({ email: credentials.email }, true)

        if (user) {
            const role = await RoleService.findById(user.RoleId)
            const verification = await user.validatePassword(credentials.password)
            if (verification) {
                const decodeObj = {
                    id: user.id, email: user.email, userName: user.userName, domain,
                }
                const jwtToken = jwt.sign(decodeObj, config.jwt.secret, { expiresIn: '2h' })

                res.send({ message: 'Welcome', token: jwtToken, permissions: role.permissions })
            } else {
                next(new Error('Password do not match'))
            }
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = login
