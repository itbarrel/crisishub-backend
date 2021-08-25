const { RoleService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const roles = await RoleService.all()
        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const register = req.body
        const roles = await RoleService.create(register)
        res.send({ message: 'Roles is created', roles })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const roles = await RoleService.findById(id)
        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const roles = await RoleService.update(req.body, { id })
        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        const roles = await RoleService.delete(req.body, { id })
        res.status(200).send(roles)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
