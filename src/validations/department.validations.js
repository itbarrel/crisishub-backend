const Joi = require('joi')

const departmentObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    departmentObj,
}
