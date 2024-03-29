const { TaskService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const Task = new TaskService()

        const { docs, pages, total } = await Task.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Task = new TaskService()

        const taskObj = req.body
        const task = await Task.create(taskObj)

        res.send(task)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Task = new TaskService()

        const { id } = req.params
        const task = await Task.findById(id)

        res.send(task)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Task = new TaskService()

        const { id } = req.params
        const task = await Task.update(req.body, { id })

        res.send(task)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Task = new TaskService()

        const { id } = req.params
        await Task.delete({ id })

        res.send({ message: 'task is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
