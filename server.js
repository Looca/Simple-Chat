//Install express server
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

io.on('connection', (socket) => {
    socket.on('username', (username) => {
        console.log(username)
        socket.broadcast.emit('user-broadcast', username);
    })
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
    socket.on('on-typing', (user) => {
        socket.broadcast.emit('on-typing-broadcast', user);
    });
});

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
http.listen(8080, () => {
    console.log('listening on ' + process.env.PORT || 8080);
});
