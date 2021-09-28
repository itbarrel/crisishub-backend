const { UserService } = require('../../../services/resources')
const storage = require('../../../utils/cl-storage')

const all = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const User = new UserService(domain)

        const users = await User.all()

        res.send(users)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const User = new UserService(domain)

        const userObj = req.body
        const user = await User.create(userObj)

        res.send({ message: 'Email is send', user })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const User = new UserService(domain)

        const { id } = req.params
        const user = await User.findById(id)

        res.send(user)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const User = new UserService(domain)

        const { id } = req.params
        const user = await User.update(req.body, { id })

        res.send(user)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const User = new UserService(domain)

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
