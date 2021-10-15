module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete Department',
    operationId: 'DeleteDepartment',
    parameters: [{
        description: 'Department ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: department is deleted }',
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
