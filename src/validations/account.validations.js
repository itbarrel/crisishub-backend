const Joi = require('joi')

const accountObj = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }).options({ allowUnknown: true }),
}

module.exports = {
    accountObj,
}
