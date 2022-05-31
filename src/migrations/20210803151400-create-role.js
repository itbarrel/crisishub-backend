module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'roles' }

        await queryInterface.createTable(table, {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            permissions: {
                type: Sequelize.JSON,
            },
            default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'roles' }

        await queryInterface.dropTable(table)
    },
}
