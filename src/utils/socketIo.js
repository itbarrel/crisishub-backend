const socketio = require('socket.io')

const connection = (io) => {
    io.on('connection', (socket) => {
        // console.log('user is connected')

        socket.on('message', () => {
            // console.log(`message from ${socket.id}: ${message}`)
        })

        socket.on('disconect', () => {
            // console.log(`socket ${socket.id} disconnect`)
        })
    })
}

const socketIo = (server) => {
    const io = socketio(server, {
        transport: ['polling'],
        cors: {
            origin: '*',
        },
    })

    connection(io)
    return io
}

module.exports = socketIo
