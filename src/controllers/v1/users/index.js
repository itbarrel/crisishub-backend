const { UserService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const User = new UserService()

        const users = await User.all()

        res.send(users)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const User = new UserService()

        const userObj = req.body
        const user = await User.create(userObj)

        res.send({ message: 'Email is send', user })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const User = new UserService()

        const { id } = req.params
        const user = await User.findById(id)

        res.send(user)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const User = new UserService()

        const { id } = req.params
        const user = await User.update(req.body, { id })

        res.send(user)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const User = new UserService()

        const { id } = req.params
        await User.delete({ id })

        res.send({ message: 'user is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
