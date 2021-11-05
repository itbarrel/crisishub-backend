module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add CustomMessage',
    operationId: 'addCustomMessage',
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
                    required: [
                        'subject',
                        'content',
                    ],
                    type: 'object',
                },
            },
        },
        description: 'Body for API',
        required: true,
    },
    responses: {
        200: {
            description: '{id:" ",name:" ",subject: " ",content: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
        },
        401: {
            description: 'Token Expire',
        },
        422: {
            description: 'Invalid input',
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
