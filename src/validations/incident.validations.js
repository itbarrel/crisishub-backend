const Joi = require('joi')

const incidentObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        closedDate: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    incidentObj,
}
