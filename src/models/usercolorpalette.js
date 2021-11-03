const {
    Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class UserColorPalette extends Model {
        static associate(models) {
            UserColorPalette.belongsToMany(models.User, { through: 'UserColorPalette' })
            UserColorPalette.belongsToMany(models.ColorPalette, { through: 'UserColorPalette' })
        }
    }
    UserColorPalette.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'UserColorPalette',
        tableName: 'userColorPalettes',
        paranoid: true,
    })
    return UserColorPalette
}
