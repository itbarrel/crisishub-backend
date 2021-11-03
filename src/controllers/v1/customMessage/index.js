const { CustomMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const CustomMessage = new CustomMessageService()

        const { docs, pages, total } = await CustomMessage.all(query, offset, limit)
        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const CustomMessage = new CustomMessageService()

        const CustomMessageObj = req.body
        const customMessage = await CustomMessage.create(CustomMessageObj)
        res.send(customMessage)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const CustomMessage = new CustomMessageService()

        const { id } = req.params
        const customMessage = await CustomMessage.findById(id)
        res.send(customMessage)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const CustomMessage = new CustomMessageService()

        const { id } = req.params
        const customMessage = await CustomMessage.update(req.body, { id })
        res.send(customMessage)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const CustomMessage = new CustomMessageService()

        const { id } = req.params
        await CustomMessage.delete({ id })
        res.send({ message: 'CustomMessage is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
