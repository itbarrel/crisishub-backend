module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update CustomMessage',
    operationId: 'updateCustomMessage',
    parameters: [{
        description: 'CustomMessage ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        subject: {
                            type: 'string',
                        },
                        content: {
                            type: 'string',
                            formet: 'text',
                        },
                        msgType: {
                            type: 'string',
                        },
                        msgTemplateType: {
                            type: 'string',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },

                    type: 'object',
                },
            },
        },
        description: 'Body for Login',
        required: true,
    },
    responses: {
        200: {
            description: '{id:" ",name:" ",subject: " ",content: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
        },
        401: {
            description: 'Token Expire',
        },
        500: {
            description: 'Something went wrong',
        },
    },
    security: [
        {
            authToken: [],
        },
    ],
    tags: ['v1/CustomMessages'],
}
