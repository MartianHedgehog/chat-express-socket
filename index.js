const io = require('socket.io')(8080);
const { v4 } = require('uuid');

let users = [];
let dialog = [{
  name: `Server message`,
  msg: `Connection has been established`,
  timestamp: Date.now()
}];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('connect', () => {
    socket.emit('dialog', dialog)
  });

  socket.emit('dialog', dialog);

  socket.join('good-room', () => {
    socket.to('good-room').emit('room-event', 'a new user connected')
  });

  socket.on('message', (name, msg) => {
    const message = {
      name,
      msg,
      timestamp: Date.now()
    };
    dialog.push(message);
    io.to('good-room').emit('dialog', dialog);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

// setInterval(function() {
//   socket.emit('dialog', dialog);
// }, 4000);

// socket.join('good-room', () => {
//   socket.to('good-room').emit('room-event', 'a new user connected')
// });

// socket.broadcast.emit('dialog', dialog);

// const NewUserObject = (userName, id, socket) => {
//   return {
//     user: userName,
//     id: socket.id,
//     socket: socket
//   }
// };

