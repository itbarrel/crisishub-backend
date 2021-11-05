module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete ColorPalette',
    operationId: 'DeleteColorPalette',
    parameters: [{
        description: 'ColorPalette ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: ColorPalette is deleted }',
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
    tags: ['v1/ColorPalettes'],
}
