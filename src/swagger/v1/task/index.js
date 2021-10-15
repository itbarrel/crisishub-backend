const getTask = require('./gettask')
const addTask = require('./addTask')
const updateTask = require('./updateTask')
const deleteTask = require('./deleteTask')

module.exports = {
    '/v1/tasks': {
        get: getTask,
        post: addTask,
    },
    '/v1/tasks/{id}': {
        put: updateTask,
        delete: deleteTask,
    },
}
