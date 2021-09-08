module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'users' }
            await queryInterface.addColumn(
                table,
                'resetPasswordToken',
                {
                    type: Sequelize.TEXT,
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

    down: async (queryInterface) => {
        const downChange = async (schema) => {
            const table = { schema, tableName: 'users' }
            await queryInterface.removeColumn(
                table,
                'resetPasswordToken',
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
