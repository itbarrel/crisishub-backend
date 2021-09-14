const { UserService } = require('../../../services/resources')

const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body

        const user = await UserService.findByQuery({ resetPasswordToken: token }, true)
        if (user) {
            user.password = password
            await user.save()
            const { id } = user
            const update = await UserService.update({ resetPasswordToken: null }, { id })
            res.send(update)
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}
module.exports = resetPassword
