const socketController = socket => {
    
    console.log('Client connect', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnect', socket.id);
    });

    socket.on('enviar-mensaje', ( payload, callback ) => {
        const id = 123456789;
        callback( { id, fecha: new Date().getTime() } );

        socket.broadcast.emit('enviar-mensaje', payload);
    });

}

module.exports = {
    socketController
}