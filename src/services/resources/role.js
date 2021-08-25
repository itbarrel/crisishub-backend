const models = require('../../models')
const AccountResourceService = require('./accountResource')

class RoleService extends AccountResourceService {
    constructor() {
        super(models.Role)
    }
}

module.exports = new RoleService()
