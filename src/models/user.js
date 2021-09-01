const {
    Model,
} = require('sequelize')
const { EmailService } = require('../services')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, { foreignKey: 'RoleId' })
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique: async (value, next) => {
                    const user = await User.findOne({
                        userName: value,
                    })
                    if (user) {
                        next('Username Already taken')
                    } else next()
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: true, len: [2, 225] },
        },
        middleName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        avatar: {
            type: DataTypes.TEXT,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        officePhone: {
            type: DataTypes.STRING,
        },
        mobilePhone: {
            type: DataTypes.STRING,
            validate: { len: [11, 11] },
        },
        countryCode: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        lastEmailActivation: {
            type: DataTypes.DATE,
        },
        lastUpdatePassword: {
            type: DataTypes.DATE,
        },
        previousEmail: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
        },
        available: {
            type: DataTypes.BOOLEAN,
            default: false,
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        hooks: {
            beforeCreate(user) {
                return user
            },
            afterCreate(user) {
                EmailService.signUpEmail(user.email, user.username)
                return user
            },
        },
    })

    // class methods
    User.byId = async (id) => User.findOne({
        where: { id },
    })

    // instance methods
    // User.prototype.toJSON = function () {
    //     return {};
    // };

    return User
}
