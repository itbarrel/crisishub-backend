const jwt = require('jsonwebtoken')
const { UserService } = require('../../../services/resources')
const storage = require('../../../utils/cl-storage')

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
        const user = await UserService.findByQuery({ email: loginData.email }, true)

        if (!user) {
            res.send({ message: 'Email and Password Not Found' })
        } else
        if (loginData.password !== user.password) {
            res.send({ message: 'Email and Password Not Found' })
        } else {
            const jwtToken = jwt.sign(
                { id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '100s' },
            )

            storage.run(() => {
                storage.set('user', user)
                next()
            })

            res.send({ message: 'Welcome', token: jwtToken })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, login,
}
