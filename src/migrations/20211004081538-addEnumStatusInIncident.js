module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'incidents' }
            await queryInterface.addColumn(
                table,
                'status',
                {
                    type: Sequelize.ENUM,
                    values: ['open', 'on hold', 'close'],
                },
            )
        }

        await upChange('public')
        const schemas = await queryInterface.sequelize.showAllSchemas({
            options: {},
        })
        return schemas.forEach(async (schema) => {
            await upChange(schema)
        })
    },

    down: async (queryInterface, Sequelize) => {
        const downChange = async (schema) => {
            const table = { schema, tableName: 'incidents' }
            await queryInterface.removeColumn(
                table,
                'status',
                {
                    type: Sequelize.ENUM,
                    values: ['open', 'on hold', 'close'],
                },
            )
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
