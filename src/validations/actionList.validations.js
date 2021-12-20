const Joi = require('joi')

const actionListsObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        IncidentId: Joi.string(),
        type: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    actionListsObj,
}
