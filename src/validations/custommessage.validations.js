const Joi = require('joi')

const custommessageObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        subject: Joi.string().required(),
        msgType: Joi.string(),
        msgTemplateType: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    custommessageObj,
}
