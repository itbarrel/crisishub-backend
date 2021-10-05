const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class IncidentService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Incident)
        this.domain = domain
    }

    async checkStatusOnDestroy(id) {
        const incident = await this.model.findOne({ id })
        if (incident) {
            if (incident.status === 'open') {
                throw new Error('Cannot Delete the Incident')
            } else if (incident.status === 'hold') {
                incident.status = 'close'
                await incident.save()
                return ({ message: 'Incident is close now! you may delete incident now' })
            } else {
                await this.model.destroy({ where: { id } })
                return ({ message: 'Incident is deleted' })
            }
        } else {
            throw new Error('Not Found')
        }
    }
}

module.exports = IncidentService
