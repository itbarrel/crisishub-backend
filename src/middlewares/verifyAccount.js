const { AccountService } = require('../services/resources')
const storage = require('../utils/cl-storage')

const verifyAccount = async (req, res, next) => {
    const account = await AccountService.findByQuery({
        id: req.headers.token,
    }, true)

    if (account) {
        storage.run(() => {
            storage.set('account', account)
            next()
        })
    } else {
        next(new Error('Not Found'))
    }
}

module.exports = verifyAccount
