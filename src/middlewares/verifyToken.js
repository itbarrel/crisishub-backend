const jwt = require('jsonwebtoken')

const config = require('../../config')
const storage = require('../utils/cl-storage')

const { UserService, AccountService, RoleService } = require('../services/resources')

const verifyToken = async (req, res, next) => {
    const token = req.headers.token || req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send('A token is required for authentication')
    }
    try {
        storage.run(async () => {
            const decoded = jwt.verify(token, config.jwt.secret)
            const account = await AccountService.findByQuery({ tenant_name: decoded.domain }, true)

            if (account) {
                storage.set('account', account)
                const user = await UserService.findByQuery({ userName: decoded.userName })
                if (user) {
                    const role = await RoleService.findByQuery({ id: user.RoleId }, true)
                    storage.set('user', user)
                    storage.set('role', role)
                    next()
                } else {
                    throw Error('Invalid User Token')
                }
            } else {
                throw Error('Invalid Domain Token')
            }
        })
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
}

module.exports = verifyToken
