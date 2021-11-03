module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('colorPalettes', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            color: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('colorPalettes')
    },
}
