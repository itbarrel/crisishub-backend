const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Incident extends Model {
        static associate(models) {
            Incident.hasMany(models.Message, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
            Incident.hasMany(models.ActionList, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
            Incident.hasMany(models.Category, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
            Incident.hasMany(models.CategoryMessage, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
            Incident.hasMany(models.IncomingMessage, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
            Incident.hasMany(models.ActionListMessage, {
                foreignKey: 'incidentId',
                onDelete: 'cascade',
            })
        }
    }
    Incident.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        closedDate: {
            type: DataTypes.DATE,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['open', 'hold', 'close'],
            defaultValue: 'open',
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
        modelName: 'Incident',
        tableName: 'incidents',
        paranoid: true,
    })
    sequelizePaginate.paginate(Incident)
    return Incident
}
