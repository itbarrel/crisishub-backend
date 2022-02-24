const Sequelize = require('sequelize')

const {
    CategoryMessageService,
    CategoryService,
} = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const CategoryMessage = new CategoryMessageService()

        const { docs, pages, total } = await CategoryMessage.all(
            query,
            offset,
            limit,
        )
        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const CategoryMessage = new CategoryMessageService()

        const categoryMessageObj = req.body
        const categoryMessage = await CategoryMessage.create(
            categoryMessageObj,
        )

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
const sortOrder = async (req, res, next) => {
    try {
        const op = Sequelize.Op
        const CategoryMessage = new CategoryMessageService()
        const Category = new CategoryService()

        const { id } = req.params
        const { categoryId, sortOrder: order } = req.body

        const categoryMessage = await CategoryMessage.findById(id)
        if (!categoryMessage) {
            throw new Error(' CategoryMessage Not found.')
        }

        const category = await Category.findById(categoryId)

        if (!category) {
            throw new Error(' Category Not found.')
        }

        const categoryMessages = await category.getCategoryMessages({
            where: {
                id: {
                    [op.ne]: id,
                },
                sortOrder: {
                    [op.gt]: order,
                },
            },
        })
        await Promise.all(
            categoryMessages.map((message, index) => message.update({
                sortOrder: order + 2 + index,
            })),
        )
        await categoryMessage.update({
            parentId: categoryId,
            sortOrder: order + 1,
        })

        res.send({ message: 'Message Location Updated' })
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
    all,
    create,
    show,
    update,
    destroy,
    sortOrder,
}
