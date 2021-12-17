const { CategoryMessageService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const CategoryMessage = new CategoryMessageService()

        const { docs, pages, total } = await CategoryMessage.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const CategoryMessage = new CategoryMessageService()

        const categoryMessageObj = req.body
        const categoryMessage = await CategoryMessage.create(categoryMessageObj)

        res.send(categoryMessage)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const CategoryMessage = new CategoryMessageService()

        const { id } = req.params
        const categoryMessage = await CategoryMessage.findById(id)

        res.send(categoryMessage)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const CategoryMessage = new CategoryMessageService()

        const { id } = req.params
        const categoryMessage = await CategoryMessage.update(req.body, { id })

        res.send(categoryMessage)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const CategoryMessage = new CategoryMessageService()

        const { id } = req.params
        await CategoryMessage.delete({ id })

        res.send({ message: 'categoryMessage is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
