const { RoleService } = require('../../../services/resources')
const storage = require('../../../utils/cl-storage')

const all = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const roles = await Role.all()

        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const register = req.body
        const role = await Role.create(register)

        res.send({ message: 'Roles is created', role })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const { id } = req.params
        const roles = await Role.findById(id)

        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const { id } = req.params
        const roles = await Role.update(req.body, { id })

        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const { id } = req.params
        await Role.delete({ id })

        res.send({ message: 'role is deleted' })
    } catch (error) {
        next(error)
    }
}

const entities = async (req, res, next) => {
    try {
        const domain = storage.get('domain')
        const Role = new RoleService(domain)

        const permissionEntities = await Role.getPermissionEntities()

        res.send(permissionEntities)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, entities,
}
