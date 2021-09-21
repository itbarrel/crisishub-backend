const { IncidentService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const incidents = await IncidentService.all()
        res.send(incidents)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const incidentObj = req.body
        const incident = await IncidentService.create(incidentObj)

        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const incident = await IncidentService.findById(id)
        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const incident = await IncidentService.update(req.body, { id })
        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await IncidentService.delete({ id })
        res.send({ message: 'incident is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
