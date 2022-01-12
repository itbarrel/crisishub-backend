const Joi = require('joi')

const categoryObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        title: Joi.string(),
        summary: Joi.string(),
        IncidentId: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    categoryObj,
}
