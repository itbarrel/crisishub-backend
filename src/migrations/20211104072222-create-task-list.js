module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('taskLists', {
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
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('taskLists')
    },
}
