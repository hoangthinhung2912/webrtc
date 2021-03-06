const omit = require('ramda/src/omit');

const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
});
const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);

  socket.on('user:join-room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('peer:connected', {
      id: socket.id
    });
    console.log('user:join-room: ', roomName);
  });

  socket.on('disconnecting', () => {
    const rooms = omit([socket.id], socket.rooms);
    Object.keys(rooms).forEach(room => {
      socket.to(room).emit('peer:disconnecting', {
        id: socket.id
      });
      console.log('disconnecting: ', room)
    })
  });

  socket.on('peer:msg', (data) => {
    console.log('peer:msg - ' + data.type + ' from ' + data.from + ' to ' + data.to);
    io.to(data.to).emit('peer:msg', data);
  });

  socket.on('participant:msg', (data) => {
    console.log('participant:msg - ' + data.type + ' from ' + data.from + ' to ' + data.to);
    if (data.to === 'all') {
      const rooms = omit([socket.id], socket.rooms);
      console.log(rooms)
      Object.keys(rooms).forEach(room => socket.to(room).emit('participant:msg', data));
    } else {
      io.to(data.to).emit('participant:msg', data);
    }
  })
});

server.listen(9999);