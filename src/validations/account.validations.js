const Joi = require('joi')

const accountObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        admin: Joi.object().keys({
            userName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        }),
    }),
}

module.exports = {
    accountObj,
}
