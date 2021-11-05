const getCustomMessages = require('./getCustomMessage')
const addCustomMessages = require('./addCustomMessage')
const updateCustomMessages = require('./updateCustomMessage')
const deleteCustomMessages = require('./deleteCustomMessage')

module.exports = {
    '/v1/customMessages': {
        get: getCustomMessages,
        post: addCustomMessages,
    },
    '/v1/customMessages/{id}': {
        put: updateCustomMessages,
        delete: deleteCustomMessages,
    },

}
