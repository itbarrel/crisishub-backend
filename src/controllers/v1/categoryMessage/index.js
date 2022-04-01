const Sequelize = require('sequelize')
const storage = require('../../../utils/cl-storage')

const {
    CategoryMessageService,
    CategoryService,
    IncomingMessageService,
    UserService,
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
        const User = new UserService()

        const categoryMessageObj = req.body
        categoryMessageObj.UserId = storage.get('userId')
        const categoryMessage = await CategoryMessage.create(
            categoryMessageObj,
        )
        const user = await User.findById(categoryMessage.UserId)
        categoryMessage.dataValues.User = user.dataValues

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
        const User = new UserService()

        const { id } = req.params
        const categoryMessage = await CategoryMessage.update(req.body, { id })
        const user = await User.findById(categoryMessage.UserId)
        categoryMessage.dataValues.User = user.dataValues

        res.send(categoryMessage)
    } catch (error) {
        next(error)
    }
}
const sortOrder = async (req, res, next) => {
    try {
        const op = Sequelize.Op
        const CategoryMessage = new CategoryMessageService()
        const IncomingMessage = new IncomingMessageService()
        const Category = new CategoryService()
        const User = new UserService()

        const { id } = req.params
        const {
            destinationCategoryId,
            sourceCategoryId,
            sortOrder: order,
        } = req.body
        // drag from category and drop in category

        if (
            sourceCategoryId !== 'IncomingMessage'
            && sourceCategoryId !== 'ActionListMessage'
        ) {
            const categoryMessage = await CategoryMessage.findById(id)
            if (!categoryMessage) {
                throw new Error(' CategoryMessage Not found.')
            }

            const category = await Category.findById(destinationCategoryId)

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
                parentId: destinationCategoryId,
                sortOrder: order + 1,
            })

            const { docs: destinationCategoryMessages } = await CategoryMessage.all({
                parentId: destinationCategoryId,
            })
            const sortOrderHSH = {}

            destinationCategoryMessages.map(
                (message) => {
                    sortOrderHSH[message.id] = message.sortOrder
                    return sortOrderHSH
                },

            )
            const io = req.app.get('io')

            const socketObj = {
                messageToUpdate: {
                    id,
                    categoryId: destinationCategoryId,
                    prevCategoryId: sourceCategoryId,
                    sortOrder: order + 1,
                },
                sortOrders: sortOrderHSH,
            }
            io.emit('categoryMessagePlacement', socketObj)

            res.send({ message: ' Location Updated' })
        } else if (
            sourceCategoryId === 'IncomingMessage'
            && sourceCategoryId !== 'ActionListMessage') {
        // drag from Incomingmessage and drop in category
            const incomingMessage = await IncomingMessage.findById(id)
            if (!incomingMessage) {
                throw new Error(' IncomingMessage Not found.')
            }
            const category = await Category.findById(destinationCategoryId)

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
            const message = await incomingMessage.update({
                parentType: 'categoryMessage',
                parentId: destinationCategoryId,
                sortOrder: order + 1,
            })

            const user = await User.findById(message.UserId)
            message.dataValues.User = user.dataValues

            const { docs: destinationCategoryMessages } = await CategoryMessage.all({
                parentId: destinationCategoryId,
            })
            const sortOrderHSH = {}
            destinationCategoryMessages.map(
                (messages) => {
                    sortOrderHSH[messages.id] = messages.sortOrder
                    return sortOrderHSH
                },
            )

            const io = req.app.get('io')

            const socketObj = {
                messageToUpdate: {
                    id,
                    categoryId: destinationCategoryId,
                    prevCategoryId: sourceCategoryId,
                    message,
                    sortOrder: order + 1,
                },
                sortOrders: sortOrderHSH,
            }

            io.emit('Insertcategorymessage', socketObj)

            res.send({ message: 'IncomingMessage' })
        }
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
