const { ActionListsService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const ActionList = new ActionListsService()
        const { docs, pages, total } = await ActionList.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const ActionList = new ActionListsService()

        const actionListObj = req.body
        const actionList = await ActionList.create(actionListObj)

        res.send(actionList)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const ActionList = new ActionListsService()

        const { id } = req.params
        const actionList = await ActionList.findById(id)

        res.send(actionList)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const ActionList = new ActionListsService()

        const { id } = req.params
        const actionList = await ActionList.update(req.body, { id })

        res.send(actionList)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const ActionList = new ActionListsService()

        const { id } = req.params
        await ActionList.delete({ id })

        res.send({ message: 'ActionList is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
