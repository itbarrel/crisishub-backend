const addIncident = require('./addIncident')
const deleteIncident = require('./deleteIncident')
const getIncidents = require('./getIncidents')
const updateIncident = require('./updateIncident')

module.exports = {
    '/v1/incidents': {
        get: getIncidents,
        post: addIncident,
    },
    '/v1/incidents/{id}': {
        put: updateIncident,
        delete: deleteIncident,
    },
}
