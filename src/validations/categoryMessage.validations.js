const Joi = require('joi')

const categoryMessageObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        parentId: Joi.string(),
        parentType: Joi.string(),
        title: Joi.string(),
        sortOrder: Joi.number(),
        IncidentId: Joi.string(),
        ColorPaletteId: Joi.string(),
        message: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    categoryMessageObj,
}
