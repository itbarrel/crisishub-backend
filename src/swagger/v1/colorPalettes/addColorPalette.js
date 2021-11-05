module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add ColorPalette',
    operationId: 'addColorPalette',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        color: {
                            type: 'string',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },
                    required: [
                        'name',
                        'color',
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
            description: '{id:" ",name:" ",active: " ",color: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/ColorPalettes'],
}
