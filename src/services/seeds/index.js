module.exports = {}

const AccountSeeder = require('./account')

const create = async () => {
    await AccountSeeder.create()
}

const destroy = async () => {
    await AccountSeeder.destroy()
}

module.exports = { create, destroy }
