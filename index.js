var express = require('express');
var app = express();
var path = require('path')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => res.send('hello!'));
app.use(express.static(path.join(__dirname, '/public')));

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

http.listen(3000, () => {
    console.log('listening on *:3000');
});