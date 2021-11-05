module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete TaskList',
    operationId: 'DeleteTaskList',
    parameters: [{
        description: 'TaskList ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: TaskList is deleted }',
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
