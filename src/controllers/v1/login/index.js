const jwt = require('jsonwebtoken')
const { UserService, AccountService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')
const { EmailService } = require('../../../services')

const login = async (req, res, next) => {
    try {
        const { domain, credentials } = req.body

        let account
        if (domain) {
            account = await AccountService.findByQuery({ tenant_name: domain }, true)
        } else {
            account = { id: 0, tenant_name: 'public' }
        }

        if (account) {
            storage.run(async () => {
                storage.set('account', account)
                const user = await UserService.findByQuery({ email: credentials.email }, true)

                if (user) {
                    const verification = await user.validatePassword(credentials.password)
                    console.log(verification, '............')
                    if (verification) {
                        const jwtToken = jwt.sign(
                            {
                                id: user.id, email: user.email, userName: user.userName, domain,
                            },
                            config.jwt.secret, { expiresIn: '2h' },
                        )

                        res.send({ message: 'Welcome', token: jwtToken })
                    } else {
                        next(new Error('Password do not match'))
                    }
                } else {
                    next(new Error('User Not Found'))
                }
            })
        } else {
            next(new Error('Password do not match'))
        }
    } catch (error) {
        next(error)
    }
}
const forgetpassword = async (req, res, next) => {
    try {
        const { domain, email } = req.body
        let account
        if (domain) {
            account = await AccountService.findByQuery({ tenant_name: domain }, true)
        } else {
            account = { id: 0, tenant_name: 'public' }
        }

        if (account) {
            storage.run(async () => {
                storage.set('account', account)
                const user = await UserService.findByQuery({ email }, true)

                if (user) {
                    const jwtToken = jwt.sign(
                        {
                            id: user.id, email: user.email, userName: user.userName, domain,
                        },
                        config.jwt.secret, { expiresIn: '0.5h' },
                    )

                    const { id } = user
                    const resetToken = { resetPasswordToken: jwtToken }
                    await UserService.update(resetToken, { id })
                    await EmailService.signUpEmail(user, jwtToken)
                    res.send({ message: 'Forget Password', Token: jwtToken })
                } else {
                    next(new Error('User Not Found'))
                }
            })
        } else {
            next(new Error('Password do not match'))
        }
    } catch (error) {
        next(error)
    }
}
const resetpassword = async (req, res, next) => {
    try {
        const user = await UserService.findByQuery({ resetPasswordToken: req.body.token }, true)
        const { id } = user
        const resetPassword = { password: req.body.password }

        await UserService.update(resetPassword, { id })
        const update = await UserService.update({ resetPasswordToken: null }, { id })
        res.send(update)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    login, forgetpassword, resetpassword,
}
