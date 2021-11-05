const getTasklists = require('./getTasklists')
const addTasklists = require('./addTasklist')
const updateTasklists = require('./updateTasklist')
const deleteTasklists = require('./deleteTasklist')

module.exports = {
    '/v1/taskLists': {
        get: getTasklists,
        post: addTasklists,
    },
    '/v1/taskLists/{id}': {
        put: updateTasklists,
        delete: deleteTasklists,
    },

}
