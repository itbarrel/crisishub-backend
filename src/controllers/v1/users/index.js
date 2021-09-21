const { UserService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const users = await UserService.all()
        res.send(users)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const userObj = req.body
        const user = await UserService.create(userObj)

        res.send({ message: 'Email is send', user })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserService.findById(id)
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserService.update(req.body, { id })
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserService.delete({ id })
        res.send({ message: 'user is deleted', id: user })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
