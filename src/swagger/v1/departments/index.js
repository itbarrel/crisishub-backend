const getDepartments = require('./getDepartment')
const addDepartment = require('./addDepartment')
const updateDepartment = require('./updateDepartment')
const deleteDepartment = require('./deleteDepartment')

module.exports = {
    '/v1/departments': {
        get: getDepartments,
        post: addDepartment,
    },
    '/v1/departments/{id}': {
        put: updateDepartment,
        delete: deleteDepartment,
    },

}
