const Joi = require('joi')

const actionListMessageObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        parentId: Joi.string(),
        parentType: Joi.string(),
        IncidentId: Joi.string(),
        ColorPaletteId: Joi.string(),
        title: Joi.string(),
        message: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    actionListMessageObj,
}
