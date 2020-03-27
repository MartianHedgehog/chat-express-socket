const  io = require('socket.io')(8080);

let dialog = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('hi', dialog);

  socket.on('chat message', (msg, name) => {
    const message = {
      name,
      msg,
      timestamp: Date.now()
    };
    socket.emit('message', message);
    dialog.push(message);
  });

  io.on('disconnect', () => {
    console.log('a user disconnected');
  });
});




