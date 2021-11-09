const Joi = require('joi')

const colorpaletteObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        color: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    colorpaletteObj,
}
