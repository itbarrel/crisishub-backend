const models = require('../../models')
const AccountResourceService = require('./accountResource')

class UserService extends AccountResourceService {
    constructor() {
        super(models.User)
    }
}

module.exports = new UserService()
