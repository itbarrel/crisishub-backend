const { ActionMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const ActionMessage = new ActionMessageService()

        const { docs, pages, total } = await ActionMessage.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const ActionMessage = new ActionMessageService()

        const actionMessageObj = req.body
        const actionMessage = await ActionMessage.create(actionMessageObj)

        res.send(actionMessage)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const ActionMessage = new ActionMessageService()

        const { id } = req.params
        const actionMessage = await ActionMessage.findById(id)

        res.send(actionMessage)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const ActionMessage = new ActionMessageService()

        const { id } = req.params
        const actionMessage = await ActionMessage.update(req.body, { id })

        res.send(actionMessage)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const ActionMessage = new ActionMessageService()

        const { id } = req.params
        await ActionMessage.delete({ id })

        res.send({ message: 'actionMessage is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
