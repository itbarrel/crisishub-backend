module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Task',
    operationId: 'addTask',
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
                    required: [
                        'title',
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
            description:
                '{id:" ",title:" ",author:" ",description:" ",type:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Tasks'],
}
