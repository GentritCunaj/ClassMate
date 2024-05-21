const { socket } = require('socket.io');
const { v4: uuidV4 } = require('uuid');

const rooms = {};

const roomHandler = (socket) => {
    const joinRoom = ({ roomId, peerId, userName }) => {
        if (!rooms[roomId]) rooms[roomId] = {};
        
        console.log('user joined the room', roomId, peerId, userName);
        rooms[roomId][peerId] = { peerId, userName };
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', { peerId, userName });
        socket.emit('get-users', {
            roomId,
            participants: rooms[roomId],
        });

        socket.on('disconnect', () => {
            console.log('user left the room', peerId);
            leaveRoom({ roomId, peerId });
        });
    };

    const leaveRoom = ({ peerId, roomId }) => {
        if (rooms[roomId]) {
            delete rooms[roomId][peerId];
            if (Object.keys(rooms[roomId]).length === 0) {
                delete rooms[roomId];
            }
            socket.to(roomId).emit('user-disconnected', peerId);
        }
    };

    const startSharing = ({ peerId, roomId }) => {
        console.log({ roomId, peerId });
        socket.to(roomId).emit('user-started-sharing', peerId);
    };

    const stopSharing = (roomId) => {
        socket.to(roomId).emit('user-stopped-sharing');
    };

    socket.on('join-room', joinRoom);
    socket.on('leave-room', leaveRoom); // Add leave-room event listener
    socket.on('start-sharing', startSharing);
    socket.on('stop-sharing', stopSharing);
};

module.exports = { roomHandler };