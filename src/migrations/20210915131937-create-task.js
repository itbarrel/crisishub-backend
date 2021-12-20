module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'tasks' }
            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDv4,
                },
                title: {
                    type: Sequelize.STRING,
                },
                author: {
                    type: Sequelize.STRING,
                },
                description: {
                    type: Sequelize.TEXT,
                },
                links: {
                    type: Sequelize.STRING,
                },
                type: {
                    type: Sequelize.STRING,
                },
                forTemplate: {
                    type: Sequelize.BOOLEAN,
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
            const table = { schema, tableName: 'tasks' }
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
