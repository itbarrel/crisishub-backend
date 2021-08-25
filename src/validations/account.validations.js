const Joi = require('joi')

const accountObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
}

module.exports = {
    accountObj,
}
