module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update Incident',
    operationId: 'updateIncident',
    parameters: [{
        description: 'Incident ID',
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

                    type: 'object',
                },
            },
        },
        description: 'Body for Login',
        required: true,
    },
    responses: {
        200: {
            description: '{id:" ",name:" ",status: " ", active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
