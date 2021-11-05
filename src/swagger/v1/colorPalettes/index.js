const getColorPalettes = require('./getColorPalettes')
const addColorPalettes = require('./addColorPalette')
const updateColorPalettes = require('./updateColorPalette')
const deleteColorPalettes = require('./deleteColorPalette')

module.exports = {
    '/v1/colorpalettes': {
        get: getColorPalettes,
        post: addColorPalettes,
    },
    '/v1/colorpalettes/{id}': {
        put: updateColorPalettes,
        delete: deleteColorPalettes,
    },

}
