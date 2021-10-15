const account = require('./accounts')
const auth = require('./auth')
const user = require('./users')
const role = require('./roles')
const department = require('./departments')
const task = require('./task')
const incidents = require('./incidents')

module.exports = {
    ...auth,
    ...account,
    ...role,
    ...user,
    ...department,
    ...task,
    ...incidents,

}
