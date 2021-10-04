const { IncidentService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const Incident = new IncidentService()

        const incidents = await Incident.all()

        res.send(incidents)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Incident = new IncidentService()

        const incidentObj = req.body
        const incident = await Incident.create(incidentObj)

        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Incident = new IncidentService()

        const { id } = req.params
        const incident = await Incident.findById(id)

        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Incident = new IncidentService()

        const { id } = req.params
        const incident = await Incident.update(req.body, { id })

        res.send(incident)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Incident = new IncidentService()

        const { id } = req.params
        const incident = await Incident.checkStatusOnDestroy(id)
        res.send(incident)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
