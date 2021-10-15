module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Department',
    operationId: 'addDepartment',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },
                    required: [
                        'name',
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
            description: '{id:" ",name:" ",active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Departments'],
}
