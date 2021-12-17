const { CategoryService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const Category = new CategoryService()

        const { docs, pages, total } = await Category.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Category = new CategoryService()

        const categoryObj = req.body
        const category = await Category.create(categoryObj)

        res.send(category)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Category = new CategoryService()

        const { id } = req.params
        const category = await Category.findById(id)

        res.send(category)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Category = new CategoryService()

        const { id } = req.params
        const category = await Category.update(req.body, { id })

        res.send(category)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Category = new CategoryService()

        const { id } = req.params
        await Category.delete({ id })

        res.send({ message: 'category is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
