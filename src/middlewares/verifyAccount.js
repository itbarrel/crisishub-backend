const jwt = require('jsonwebtoken')

const config = require('../../config')
const storage = require('../utils/cl-storage')

const { AccountService } = require('../services/resources')

const verifyAccount = async (req, res, next) => {
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
                next()
            } else {
                throw Error('Invalid Domain Token')
            }
        } catch (err) {
            return res.status(401).send({ message: 'Invalid Domain Token' })
        }
    })
}

module.exports = verifyAccount
