module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'users' }
        await queryInterface.createTable(table, {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            middleName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.TEXT,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            officePhone: {
                type: Sequelize.STRING,
            },
            mobilePhone: {
                type: Sequelize.STRING,
            },
            countryCode: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            lastEmailActivation: {
                type: Sequelize.DATE,
            },
            lastUpdatePassword: {
                type: Sequelize.DATE,
            },
            previousEmail: {
                type: Sequelize.STRING,
            },
            available: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            RoleId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
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
        const { sequelize } = queryInterface
        const { options } = sequelize
        const schema = options.schema || 'public'

        const table = { schema, tableName: 'users' }

        await queryInterface.dropTable(table)
    },
}
