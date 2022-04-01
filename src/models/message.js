const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Incident, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Message.belongsTo(models.ColorPalette, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Message.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    Message.init(
        {
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
                defaultValue: 'message',
            },
            title: {
                type: DataTypes.STRING,
            },
            message: {
                type: DataTypes.STRING,
            },
            sortOrder: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
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
        },
        {
            sequelize,
            modelName: 'Message',
            tableName: 'messages',
            defaultScope: {
                where: {
                    parentType: 'message',
                },
            },
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(Message)
    return Message
}
