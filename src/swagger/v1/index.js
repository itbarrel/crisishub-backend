const account = require('./accounts')
const auth = require('./auth')
const user = require('./users')
const role = require('./roles')
const department = require('./departments')
const task = require('./task')
const incidents = require('./incidents')
const colorpalette = require('./colorPalettes')
const customMessage = require('./customMessages')
const scenario = require('./scenarios')
const TaskList = require('./taskLists')

module.exports = {
    ...auth,
    ...account,
    ...role,
    ...user,
    ...department,
    ...task,
    ...incidents,
    ...colorpalette,
    ...customMessage,
    ...TaskList,
    ...scenario,

}
