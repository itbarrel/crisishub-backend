const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ActionMessage extends Model {
        static associate(models) {
            ActionMessage.belongsTo(models.Action, {
                foreignKey: 'parentId',
            })
            ActionMessage.belongsTo(models.Incident, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    ActionMessage.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.UUID,
        },
        parentType: {
            type: DataTypes.STRING,
            defaultValue: 'actionListMessage',
        },
        title: {
            type: DataTypes.STRING,
        },
        message: {
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
        modelName: 'ActionMessage',
        tableName: 'messages',
        paranoid: true,
    })
    sequelizePaginate.paginate(ActionMessage)
    return ActionMessage
}
