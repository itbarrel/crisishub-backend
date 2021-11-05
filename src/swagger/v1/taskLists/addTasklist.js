module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add TaskList',
    operationId: 'addTaskList',
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
                        links: {
                            type: 'string',
                        },
                        type: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                            formet: 'text',
                        },
                        forTemplate: {
                            type: 'boolean',
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
            description: '{id:" ",title:" ",author: " ",description: " ",links:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/TaskLists'],
}
