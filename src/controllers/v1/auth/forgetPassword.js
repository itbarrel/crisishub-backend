const jwt = require('jsonwebtoken')
const { UserService } = require('../../../services/resources')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')
const { EmailService } = require('../../../services')

const forgetPassword = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const { email } = req.body
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
    } catch (error) {
        next(error)
    }
}

module.exports = forgetPassword
