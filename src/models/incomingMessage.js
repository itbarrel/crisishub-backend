const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class IncomingMessage extends Model {
        static associate(models) {
            IncomingMessage.belongsTo(models.Incident, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            IncomingMessage.belongsTo(models.ColorPalette, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            IncomingMessage.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    IncomingMessage.init(
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
                defaultValue: 'incomingMessage',
            },
            title: {
                type: DataTypes.STRING,
            },
            message: {
                type: DataTypes.STRING,
            },
            sortOrder: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
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
            modelName: 'IncomingMessage',
            tableName: 'messages',
            defaultScope: {
                where: {
                    parentType: 'incomingMessage',
                },
                order: [['sortOrder', 'ASC']],
            },
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(IncomingMessage)
    return IncomingMessage
}
