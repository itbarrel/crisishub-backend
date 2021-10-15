module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete Incident',
    operationId: 'DeleteIncident',
    parameters: [{
        description: 'Incident ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: Incident is deleted }',
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
    tags: ['v1/Incidents'],
}
