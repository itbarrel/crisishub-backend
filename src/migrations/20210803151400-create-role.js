module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
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
        }
        await upChange('public')
        const schemas = await queryInterface.sequelize.showAllSchemas({
            options: {},
        })
        return schemas.forEach(async (schema) => {
            await upChange(schema)
        })
    },
    down: async (queryInterface) => {
        const downChange = async (schema) => {
            const table = { schema, tableName: 'roles' }
            await queryInterface.dropTable(table)
        }

        await downChange('public')
        const schemas = await queryInterface.sequelize.showAllSchemas({
            options: {},
        })
        return schemas.forEach(async (schema) => {
            await downChange(schema)
        })
    },
}
