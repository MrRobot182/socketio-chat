const socket = io();

//DOM
let message = document.getElementById('message');
let user = document.getElementById('user');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click',() => {
    socket.emit('chat-message', {
        user: user.value, 
        message: message.value
    });

    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('chat-typing', user.value);
});

socket.on('chat-typing', (data) => {
    actions.innerHTML = `<p><em>${data} is typing...<em></p>`
});

socket.on('chat-message', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `<p><strong>${data.user}</strong>: ${data.message}</p>`
});