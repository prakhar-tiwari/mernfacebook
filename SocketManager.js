const io = require('./socket');
const { SEND_MESSAGE, PRIVATE_CHAT_MESSAGE } = require('./utils/Types');

const SocketManager = (socket) => {
    // socket.on(SEND_MESSAGE, ({ sender, reciever, result }, callback) => {
    //     const room = [sender, reciever].sort().join("-");
    //     if (room) {
    //         socket.join(room);
    //         io.getIO().to(room).emit(PRIVATE_CHAT_MESSAGE, result);
    //         callback(result);
    //     }
    //     else {
    //         callback();
    //     }
    // })
    socket.on('check-message', ({ sender, reciever, result }) => {
        const room = [sender, reciever].sort().join("-");
        if (room) {
            socket.join(room);
            io.getIO().to(room).emit(PRIVATE_CHAT_MESSAGE, result);
        }
    })
}

module.exports = SocketManager;