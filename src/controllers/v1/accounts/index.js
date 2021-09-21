const { AccountService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const accounts = await AccountService.all()
        res.send(accounts)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const account = await AccountService.create(req.body)
        res.send(account)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await AccountService.findById(id)
        res.send(account)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await AccountService.update(req.body, { id })
        res.send(account)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await AccountService.delete({ id })
        res.send(account)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
