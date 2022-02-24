module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'categories' }
            await queryInterface.addColumn(table, 'sortOrder', {
                type: Sequelize.INTEGER,
                autoIncrement: true,
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
            const table = { schema, tableName: 'categories' }
            await queryInterface.removeColumn(table, 'sortOrder')
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
