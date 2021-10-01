const { DepartmentService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const Department = new DepartmentService()

        const departments = await Department.all()

        res.send(departments)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Department = new DepartmentService()

        const departmentObj = req.body
        const department = await Department.create(departmentObj)

        res.send(department)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Department = new DepartmentService()

        const { id } = req.params
        const department = await Department.findById(id)

        res.send(department)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Department = new DepartmentService()

        const { id } = req.params
        const department = await Department.update(req.body, { id })

        res.send(department)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Department = new DepartmentService()

        const { id } = req.params
        await Department.delete({ id })

        res.send({ message: 'department is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
