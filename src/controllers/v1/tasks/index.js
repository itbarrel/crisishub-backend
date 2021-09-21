const { TaskService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const task = await TaskService.all()
        res.send(task)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const taskObj = req.body
        const task = await TaskService.create(taskObj)
        res.send(task)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await TaskService.findById(id)
        res.send(task)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await TaskService.update(req.body, { id })
        res.send(task)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await TaskService.delete({ id })
        res.send({ message: 'task is deleted', id: task })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
