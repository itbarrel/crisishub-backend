module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'messages' }
            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDv4,
                },
                parentId: {
                    type: Sequelize.UUID,
                },
                parentType: {
                    type: Sequelize.STRING,
                },
                title: {
                    type: Sequelize.STRING,
                },
                message: {
                    type: Sequelize.STRING,
                },
                UserId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
                IncidentId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'incidents',
                        key: 'id',
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
                ColorPaletteId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'colorPalettes',
                        key: 'id',
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true,
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
            const table = { schema, tableName: 'messages' }
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
