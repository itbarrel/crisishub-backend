const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Incident, {
                foreignKey: 'incidentId',
            })
        }
    }
    Message.init({
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
        modelName: 'Message',
        tableName: 'messages',
        paranoid: true,
    })
    sequelizePaginate.paginate(Message)
    return Message
}
