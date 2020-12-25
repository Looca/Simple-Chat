//Install express server
const express = require('express');
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/chat-example-frontend'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/chat-example-frontend/index.html'));
});

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
app.listen(process.env.PORT || 8080);
