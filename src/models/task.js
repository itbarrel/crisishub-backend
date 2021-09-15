const {
    Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {

    // static associate(models) {
    //   // define association here
    // }
    }
    Task.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        links: {
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
        modelName: 'Task',
        tableName: 'tasks',
        paranoid: true,
    })
    return Task
}
