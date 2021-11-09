const Joi = require('joi')

const taskoObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        title: Joi.string().required(),
        author: Joi.string(),
        description: Joi.string(),
        links: Joi.string(),
        type: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    taskoObj,
}
