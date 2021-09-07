const models = require('../../models')
const AccountResourceService = require('./accountResource')

class DepartmentService extends AccountResourceService {
    constructor() {
        super(models.Department)
    }
}

module.exports = new DepartmentService()
