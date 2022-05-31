module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'
        const table = { schema, tableName: 'users' }
        await queryInterface.addColumn(
            table,
            'resetPasswordToken',
            {
                type: Sequelize.TEXT,
            },

        )
    },

    down: async (queryInterface) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'users' }

        await queryInterface.removeColumn(
            table,
            'resetPasswordToken',
        )
    },
}
