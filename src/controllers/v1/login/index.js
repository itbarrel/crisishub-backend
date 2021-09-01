const jwt = require('jsonwebtoken')
const { UserService, AccountService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const login = async (req, res, next) => {
    try {
        const { domain, credentials } = req.body

        const account = await AccountService.findByQuery({ tenant_name: domain }, true)

        if (account) {
            storage.run(async () => {
                storage.set('account', account)
                const user = await UserService.findByQuery({ email: credentials.email }, true)

                if (user) {
                    const verification = await user.validatePassword(credentials.password)
                    if (verification) {
                        const jwtToken = jwt.sign(
                            {
                                id: user.id, email: user.email, userName: user.userName, domain,
                            },
                            config.jwt.secret, { expiresIn: '2h' },
                        )

                        res.send({ message: 'Welcome', token: jwtToken })
                    } else {
                        throw Error('Password do not match')
                    }
                } else {
                    throw Error('User Not Found')
                }
            })
        } else {
            throw Error('Domain Not Found')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
}
