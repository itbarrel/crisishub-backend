const models = require('../../models')
const AccountResourceService = require('./accountResource')

class TaskService extends AccountResourceService {
    constructor() {
        super(models.Task)
    }
}

module.exports = new TaskService()
