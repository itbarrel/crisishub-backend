const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ActionListMessage extends Model {
        static associate(models) {
            ActionListMessage.belongsTo(models.ActionList,
                {
                    foreignKey: 'parentId',
                })
            ActionListMessage.belongsTo(models.Incident,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
            ActionListMessage.belongsTo(models.ColorPalette,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
        }
    }
    ActionListMessage.init({
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
        modelName: 'ActionListMessage',
        tableName: 'messages',
        defaultScope: {
            where: {
                parentType: 'actionListMessage',
            },
        },
        paranoid: true,
    })
    sequelizePaginate.paginate(ActionListMessage)
    return ActionListMessage
}
