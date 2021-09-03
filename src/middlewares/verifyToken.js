const jwt = require('jsonwebtoken')

const config = require('../../config')
const storage = require('../utils/cl-storage')

const { UserService, AccountService, RoleService } = require('../services/resources')

const verifyToken = async (req, res, next) => {
    const token = req.headers.token || req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send('A token is required for authentication')
    }
    storage.run(async () => {
        try {
            const decoded = jwt.verify(token, config.jwt.secret)
            let account
            if (decoded.domain) {
                account = await AccountService.findByQuery({ tenant_name: decoded.domain }, true)
            } else {
                account = { id: 0, tenant_name: 'public' }
            }

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
        } catch (err) {
            return res.status(401).send({ message: 'Invalid Token' })
        }
    })
}

module.exports = verifyToken
