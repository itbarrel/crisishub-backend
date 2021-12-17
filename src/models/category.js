const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.CategoryMessage, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'categoryMessage',
                },
            })
            Category.belongsTo(models.Incident, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    Category.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        summary: {
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
        modelName: 'Category',
        tableName: 'categories',
        paranoid: true,
    })
    sequelizePaginate.paginate(Category)
    return Category
}
