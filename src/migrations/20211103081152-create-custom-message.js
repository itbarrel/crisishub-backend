module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('customMessages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            subject: {
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.TEXT,
            },
            msgType: {
                type: Sequelize.STRING,
            },
            msgTemplateType: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('customMessages')
    },
}
