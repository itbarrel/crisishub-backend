const jwt = require('jsonwebtoken')
const { UserService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const users = await UserService.all()
        res.send(users)
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const loginData = req.body
        const verifyEmail = await UserService.findByQuery({ email: loginData.email }, true)

        if (!verifyEmail) {
            res.send({ message: 'Email and Password Not Found' })
        } else
        if (loginData.password !== verifyEmail.password) {
            res.send({ message: 'Email and Password Not Found' })
        } else {
            const jwtToken = jwt.sign(
                { id: verifyEmail.id, email: verifyEmail.email }, process.env.JWT_SECRET, { expiresIn: '100s' },
            )
            res.send({ message: 'Welcome', token: jwtToken })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, login,
}
