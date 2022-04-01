const Sequelize = require('sequelize')
const {
    IncomingMessageService,
    CategoryMessageService,
    UserService,
} = require('../../../services/resources')
const storage = require('../../../utils/cl-storage')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const IncomingMessage = new IncomingMessageService()

        const { docs, pages, total } = await IncomingMessage.all(
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
        const User = new UserService()

        const IncomingMessage = new IncomingMessageService()

        const incomingMessageObj = req.body
        incomingMessageObj.UserId = storage.get('userId')

        const incomingMessage = await IncomingMessage.create(
            incomingMessageObj,
        )
        const user = await User.findById(incomingMessage.UserId)
        incomingMessage.dataValues.User = user.dataValues

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
        const User = new UserService()

        const { id } = req.params
        const incomingMessage = await IncomingMessage.update(req.body, { id })
        const user = await User.findById(incomingMessage.UserId)
        incomingMessage.dataValues.User = user.dataValues

        res.send(incomingMessage)
    } catch (error) {
        next(error)
    }
}
const sortOrder = async (req, res, next) => {
    try {
        const op = Sequelize.Op
        const IncomingMessage = new IncomingMessageService()
        const User = new UserService()

        const CategoryMessage = new CategoryMessageService()

        const { id } = req.params
        const {
            destinationIncomingMessageId,
            sourceIncomingMessageId,
            sortOrder: order,
        } = req.body
        // drag from Incomingmessage and drop in incomingmessage
        if (
            destinationIncomingMessageId === 'IncomingMessage'
            && sourceIncomingMessageId === 'IncomingMessage'
            && destinationIncomingMessageId !== 'ActionListMessage'
            && sourceIncomingMessageId !== 'ActionListMessage'
        ) {
            const incomingMessage = await IncomingMessage.findById(id)
            if (!incomingMessage) {
                throw new Error(' IncomingMessage Not found.')
            }

            const { docs: incomingMessages } = await IncomingMessage.all({
                id: {
                    [op.ne]: id,
                },
                sortOrder: {
                    [op.gt]: order,
                },
            })

            if (!incomingMessages) {
                throw new Error(' IncomingMessages Not found.')
            }

            await Promise.all(
                incomingMessages.map((message, index) => message.update({
                    sortOrder: order + 2 + index,
                })),
            )

            await incomingMessage.update({
                sortOrder: order + 1,
            })

            const { docs: destinationMessages } = await IncomingMessage.all()

            const sortOrderHSH = {}
            destinationMessages.map(
                (messages) => {
                    sortOrderHSH[messages.id] = messages.sortOrder
                    return sortOrderHSH
                },
            )

            const io = req.app.get('io')

            const socketObj = {
                messageToUpdate: {
                    id,
                    categoryId: destinationIncomingMessageId,
                    prevCategoryId: sourceIncomingMessageId,
                    sortOrder: order + 1,
                },
                sortOrders: sortOrderHSH,
            }
            io.emit('IncomingmessagePlacement', socketObj)

            res.send({ message: ' Location Updated' })
        } else if (
            destinationIncomingMessageId === 'IncomingMessage'
            && destinationIncomingMessageId !== 'ActionListMessage'
        ) {
        // drag from category and drop in incomingmessage

            const categoryMessage = await CategoryMessage.findById(id)
            if (!CategoryMessage) {
                throw new Error(' CategoryMessage Not found.')
            }

            const { docs: incomingMessages } = await IncomingMessage.all({
                id: {
                    [op.ne]: id,
                },
                sortOrder: {
                    [op.gt]: order,
                },
            })

            if (!incomingMessages) {
                throw new Error(' IncomingMessages Not found.')
            }

            await Promise.all(
                incomingMessages.map((message, index) => message.update({
                    sortOrder: order + 2 + index,
                })),
            )

            const message = await categoryMessage.update({
                parentType: 'incomingMessage',
                parentId: null,
                sortOrder: order + 1,
            })

            const user = await User.findById(message.UserId)
            message.dataValues.User = user.dataValues

            const { docs: destinationMessages } = await IncomingMessage.all()

            const sortOrderHSH = {}
            destinationMessages.map(
                (messages) => {
                    sortOrderHSH[messages.id] = messages.sortOrder
                    return sortOrderHSH
                },
            )

            const io = req.app.get('io')

            const socketObj = {
                messageToUpdate: {
                    id,
                    categoryId: destinationIncomingMessageId,
                    prevCategoryId: sourceIncomingMessageId,
                    message,
                    sortOrder: order + 1,
                },
                sortOrders: sortOrderHSH,
            }
            io.emit('insertIncomingmessagePlacement', socketObj)

            res.send({ message: ' Location Updated' })
        }
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
    all,
    create,
    show,
    update,
    sortOrder,
    destroy,
}
