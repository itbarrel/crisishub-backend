module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'scenarios' }
        await queryInterface.createTable(table, {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'scenarios' }

        await queryInterface.dropTable(table)
    },
}
