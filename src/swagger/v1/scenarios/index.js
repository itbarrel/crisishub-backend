const getScenarios = require('./getScenario')
const addScenarios = require('./addScenario')
const updateScenarios = require('./updateScenario')
const deleteScenarios = require('./deleteScenario')

module.exports = {
    '/v1/scenarios': {
        get: getScenarios,
        post: addScenarios,
    },
    '/v1/scenarios/{id}': {
        put: updateScenarios,
        delete: deleteScenarios,
    },

}
