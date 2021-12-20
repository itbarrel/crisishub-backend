const { ActionListMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const ActionListMessage = new ActionListMessageService()

        const { docs, pages, total } = await ActionListMessage.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const ActionListMessage = new ActionListMessageService()

        const actionListMessageObj = req.body
        const actionListMessage = await ActionListMessage.create(actionListMessageObj)

        res.send(actionListMessage)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const ActionListMessage = new ActionListMessageService()

        const { id } = req.params
        const actionListMessage = await ActionListMessage.findById(id)

        res.send(actionListMessage)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const ActionListMessage = new ActionListMessageService()

        const { id } = req.params
        const actionListMessage = await ActionListMessage.update(req.body, { id })

        res.send(actionListMessage)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const ActionListMessage = new ActionListMessageService()

        const { id } = req.params
        await ActionListMessage.delete({ id })

        res.send({ message: 'ActionListMessage is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
