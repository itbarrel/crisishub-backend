module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete Task',
    operationId: 'DeleteTask',
    parameters: [{
        description: 'Task ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: Task is deleted }',
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
