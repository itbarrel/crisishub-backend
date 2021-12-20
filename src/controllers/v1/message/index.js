const { Messageservice } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const Message = new Messageservice()

        const { docs, pages, total } = await Message.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Message = new Messageservice()

        const messageObj = req.body
        const message = await Message.create(messageObj)

        res.send(message)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Message = new Messageservice()

        const { id } = req.params
        const message = await Message.findById(id)

        res.send(message)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Message = new Messageservice()

        const { id } = req.params
        const message = await Message.update(req.body, { id })

        res.send(message)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Message = new Messageservice()

        const { id } = req.params
        await Message.delete({ id })

        res.send({ message: 'Message is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
