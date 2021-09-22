const jwt = require('jsonwebtoken')
const { UserService, RoleService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const me = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const { token } = req.body

        if (token) {
            const decodeObj = jwt.verify(token, config.jwt.secret)
            if (decodeObj) {
                const user = await UserService.findByQuery({ email: decodeObj.email }, true)
                const role = await RoleService.findById(user.RoleId)
                const tokenObj = {
                    id: decodeObj.id, email: decodeObj.email, userName: decodeObj.userName, domain,
                }
                const jwtToken = jwt.sign(tokenObj, config.jwt.secret, { expiresIn: '2h' })

                res.send({ message: 'Welcome', token: jwtToken, permissions: role.permissions })
            } else {
                next(new Error('Token not Verify'))
            }
        } else {
            next(new Error('Token Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = me
