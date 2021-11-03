const { ScenarioService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const Scenario = new ScenarioService()

        const { docs, pages, total } = await Scenario.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Scenario = new ScenarioService()

        const ScenarioObj = req.body
        const scenario = await Scenario.create(ScenarioObj)
        res.send(scenario)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Scenario = new ScenarioService()

        const { id } = req.params
        const scenario = await Scenario.findById(id)

        res.send(scenario)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Scenario = new ScenarioService()

        const { id } = req.params
        const scenario = await Scenario.update(req.body, { id })

        res.send(scenario)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Scenario = new ScenarioService()

        const { id } = req.params
        await Scenario.delete({ id })

        res.send({ message: 'Scenario is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
