const Joi = require('joi')

const messageObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        parentId: Joi.string(),
        parentType: Joi.string(),
        ColorPaletteId: Joi.string(),
        IncidentId: Joi.string(),
        title: Joi.string(),
        message: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    messageObj,
}