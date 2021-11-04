const { TaskListService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const TaskList = new TaskListService()

        const { docs, pages, total } = await TaskList.all(query, offset, limit)
        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const TaskList = new TaskListService()

        const TaskListObj = req.body
        const taskList = await TaskList.create(TaskListObj)
        res.send(taskList)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const TaskList = new TaskListService()

        const { id } = req.params
        const taskList = await TaskList.findById(id)
        res.send(taskList)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const TaskList = new TaskListService()

        const { id } = req.params
        const taskList = await TaskList.update(req.body, { id })
        res.send(taskList)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const TaskList = new TaskListService()

        const { id } = req.params
        await TaskList.delete({ id })
        res.send({ message: 'TaskList is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
