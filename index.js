const path = require('path');
const express = require('express');
const app = express();

//config
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start
const server = app.listen(app.get('port'), () => console.log('Server on port',app.get('port')));

const SocketIo = require('socket.io');
const io = SocketIo(server);

//websockets
io.on('connection', (socket) => { //socket de cliente
    console.log('new connection detected!', socket.id);
    
    socket.on('chat-message', (data) => {
        //console.log(data);
        io.sockets.emit('chat-message', data);
    })

    socket.on('chat-typing', (data) => {
        socket.broadcast.emit('chat-typing', data); // everybody except me
    })
})


