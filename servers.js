// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Serve your front-end files (the HTML, CSS, JS)

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a username from the client
    socket.on('setName', (username) => {
        console.log(`${socket.id} set their name to ${username}`);
        socket.username = username;

        // Broadcast the new username to all clients
        io.emit('updateUserList', getUsernames());
    });

    // When the player sends a message (or any other event you need)
    socket.on('mouseMove', (position) => {
        io.emit('mouseMove', { id: socket.id, position });
    });

    // When a player disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        io.emit('updateUserList', getUsernames());
    });
});

// Helper function to get the list of usernames
function getUsernames() {
    return Object.values(io.sockets.sockets).map(socket => socket.username);
}

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
