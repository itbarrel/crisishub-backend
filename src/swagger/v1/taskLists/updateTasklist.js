module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update TaskList',
    operationId: 'updateTaskList',
    parameters: [{
        description: 'TaskList ID',
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

                    type: 'object',
                },
            },
        },
        description: 'Body for Login',
        required: true,
    },
    responses: {
        200: {
            description: '{id:" ",title:" ",author: " ",description: " ",links:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/TaskLists'],
}
