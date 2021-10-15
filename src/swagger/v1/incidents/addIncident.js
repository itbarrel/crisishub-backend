module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Incident',
    operationId: 'addIncident',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        closedDate: {
                            type: 'string',
                            format: 'date',
                        },
                        status: {
                            enum: [
                                'open',
                                'hold',
                                'close',
                            ],
                            type: 'string',
                            format: 'enum',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },
                    required: [
                        'name',
                        'status',
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
            description: '{id:" ",name:" ",status: " ", active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Incidents'],
}
