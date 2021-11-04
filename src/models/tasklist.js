const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class TaskList extends Model {
        static associate() {
            // define association here
        }
    }
    TaskList.init({
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
        links: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        forTemplate: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        modelName: 'TaskList',
        tableName: 'taskLists',
        paranoid: true,
    })
    sequelizePaginate.paginate(TaskList)
    return TaskList
}
