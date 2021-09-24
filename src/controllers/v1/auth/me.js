const jwt = require('jsonwebtoken')
const { UserService, RoleService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const me = async (req, res, next) => {
    try {
        const decoded = storage.get('decoded')

        if (decoded && decoded.userName && decoded.domain) {
            const user = await UserService.findByQuery({ email: decoded.email }, true)
            const role = await RoleService.findById(user.RoleId)
            const tokenObj = {
                id: user.id, email: user.email, userName: user.userName, domain: decoded.domain,
            }
            const jwtToken = jwt.sign(tokenObj, config.jwt.secret, { expiresIn: '2h' })

            res.send({ message: 'Welcome', token: jwtToken, permissions: role.permissions })
        } else {
            next(new Error('Token Not Verified'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = me
