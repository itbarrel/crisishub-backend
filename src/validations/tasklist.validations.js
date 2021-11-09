const Joi = require('joi')

const tasklistoObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        title: Joi.string().required(),
        author: Joi.string(),
        description: Joi.string(),
        links: Joi.string(),
        type: Joi.string(),
        forTemplate: Joi.boolean(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    tasklistoObj,
}
