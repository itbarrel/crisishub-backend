const { DepartmentService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const departments = await DepartmentService.all()
        res.send(departments)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const departmentObj = req.body
        const department = await DepartmentService.create(departmentObj)

        res.send(department)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const department = await DepartmentService.findById(id)
        res.send(department)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const department = await DepartmentService.update(req.body, { id })
        res.send(department)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        const department = await DepartmentService.delete({ id })
        res.send({ message: 'department is deleted', id: department })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
