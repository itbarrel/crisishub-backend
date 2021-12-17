const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Action extends Model {
        static associate(models) {
            Action.hasMany(models.ActionMessage, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'actionMessage',
                },

            })
            Action.belongsTo(models.Incident, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    Action.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
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
        modelName: 'Action',
        tableName: 'actions',
        paranoid: true,
    })
    sequelizePaginate.paginate(Action)

    return Action
}
