module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            tenant_name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            description: Sequelize.TEXT,
            dynamicFormAccountId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            dynamicFormAccountApikey: {
                type: Sequelize.STRING,
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
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('accounts')
    },
}
