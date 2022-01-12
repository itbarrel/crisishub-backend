const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ColorPalette extends Model {
        static associate(models) {
            ColorPalette.belongsToMany(models.User, { through: 'UserColorPalette' })

            ColorPalette.hasMany(models.ActionListMessage,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })

            ColorPalette.hasMany(models.Message,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
            ColorPalette.hasMany(models.CategoryMessage,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
            ColorPalette.hasMany(models.IncomingMessage,
                {
                    foreignKey: {
                        allowNull: false,
                    },
                    onDelete: 'cascade',
                })
        }
    }
    ColorPalette.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'ColorPalette',
        tableName: 'colorPalettes',
        paranoid: true,
    })
    sequelizePaginate.paginate(ColorPalette)
    return ColorPalette
}
