module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'incidents' }
        await queryInterface.addColumn(
            table,
            'status',
            {
                type: Sequelize.ENUM,
                values: ['open', 'hold', 'close'],
            },
        )
    },

    down: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'incidents' }

        await queryInterface.removeColumn(
            table,
            'status',
            {
                type: Sequelize.ENUM,
                values: ['open', 'hold', 'close'],
            },
        )
        await queryInterface.sequelize.query('drop type enum_incidents_status;')
    },
}
