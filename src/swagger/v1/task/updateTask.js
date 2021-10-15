module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update Task',
    operationId: 'updateTask',
    parameters: [{
        description: 'Task ID',
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
                        title: {
                            type: 'string',
                        },
                        author: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                            format: 'text',
                        },
                        links: {
                            type: 'string',
                        },
                        type: {
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
            description:
                '{id:" ",title:" ",author:" ",description:" ",type:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Tasks'],
}
