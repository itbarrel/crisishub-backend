const Joi = require('joi')

const scenarioObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    scenarioObj,
}
