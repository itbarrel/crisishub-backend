const storage = require('../utils/cl-storage')

const { AccountService } = require('../services/resources')

const verifyAccount = async (req, res, next) => {
    const domain = storage.get('domain')

    storage.run(async () => {
        try {
            let account
            if (domain) {
                if (domain === 'public') {
                    account = { id: 0, tenant_name: 'public' }
                } else {
                    account = await AccountService.findByQuery({ tenant_name: domain }, true)
                }
            } else {
                throw Error('Invalid Domain Found')
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
