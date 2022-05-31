const Umzug = require('umzug')
const path = require('path')
const Sequelize = require('sequelize')
// const models = require('../models')
const connection = require('./dynamicConnection')

// const { sequelize } = require('../models')

module.exports = (tenant = 'public') => {
    const sequelize = connection(tenant)

    const umzug = new Umzug({
        migrations: {
            // indicates the folder containing the migration .js files
            path: path.join(process.cwd(), './src/migrations'),
            // inject sequelize's QueryInterface in the migrations
            params: [
                sequelize.getQueryInterface(),
                Sequelize,
            ],
        },
        // indicates that the migration data should be store in the database
        // itself through sequelize. The default configuration creates a table
        // named `SequelizeMeta`.
        storage: 'sequelize',
        storageOptions: {
            sequelize,
        },
    })

    async function migrate() {
        return umzug.up()
    }

    async function revert() {
        return umzug.down({ to: 0 })
    }

    return {
        migrate,
        revert,
    }
}
