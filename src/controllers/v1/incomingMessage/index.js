const { IncomingMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const IncomingMessage = new IncomingMessageService()

        const { docs, pages, total } = await IncomingMessage.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const IncomingMessage = new IncomingMessageService()

        const incomingMessageObj = req.body
        const incomingMessage = await IncomingMessage.create(incomingMessageObj)

        res.send(incomingMessage)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const IncomingMessage = new IncomingMessageService()

        const { id } = req.params
        const incomingMessage = await IncomingMessage.findById(id)

        res.send(incomingMessage)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const IncomingMessage = new IncomingMessageService()

        const { id } = req.params
        const incomingMessage = await IncomingMessage.update(req.body, { id })

        res.send(incomingMessage)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const IncomingMessage = new IncomingMessageService()

        const { id } = req.params
        await IncomingMessage.delete({ id })

        res.send({ message: 'IncomingMessage is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
