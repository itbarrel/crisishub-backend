module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update Department',
    operationId: 'updateDepartment',
    parameters: [{
        description: 'Department ID',
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
                        name: {
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
            description: '{id:" ",name:" ",active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Departments'],
}
