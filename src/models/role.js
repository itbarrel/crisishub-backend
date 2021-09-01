const {
    Model,
} = require('sequelize')
const { downcase, removeChars } = require('../utils')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User, { foreignKey: 'RoleId' })
        }
    }

    Role.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique: async (value, next) => {
                    const role = await Role.findOne({
                        name: value,
                    })
                    if (role) {
                        next('Name Already taken')
                    } else next()
                },
            },
        },
        value: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Role',
        tableName: 'roles',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        hooks: {
            // eslint-disable-next-line no-unused-vars
            beforeValidate: (role) => {
                role.value = removeChars(downcase(role.name))
                return role
            },
        },
    })

    // class methods
    Role.byId = async (id) => Role.findOne({
        where: { id },
    })

    // instance methods
    // Role.prototype.toJSON = function () {
    //     return { id: this.id };
    // };

    // Role.plugin(paginate);

    return Role
}
