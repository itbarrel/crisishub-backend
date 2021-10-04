const {
    Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Incident extends Model {

        // static associate(models) {
        //   // define association here
        // }
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
            values: ['open', 'on hold', 'close'],
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
    return Incident
}
