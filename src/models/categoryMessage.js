const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class CategoryMessage extends Model {
        static associate(models) {
            CategoryMessage.belongsTo(models.Category,
                {
                    foreignKey: 'parentId',
                })
            CategoryMessage.belongsTo(models.Incident,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
            CategoryMessage.belongsTo(models.ColorPalette,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
        }
    }
    CategoryMessage.init({
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
            defaultValue: 'categoryMessage',
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
        modelName: 'CategoryMessage',
        tableName: 'messages',
        defaultScope: {
            where: {
                parentType: 'categoryMessage',
            },
        },
        paranoid: true,
    })
    sequelizePaginate.paginate(CategoryMessage)
    return CategoryMessage
}
