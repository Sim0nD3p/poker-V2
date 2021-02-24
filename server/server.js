const io = require('socket.io')(5000)

let players = [];
playersDisconnected = [];
ids = [];

io.on('connection', (socket) => {
  console.log('New connection!!!');
  //io.emit('test', socket);
  const id = socket.handshake.query.id;
  ids.push(id);
  //console.log(socket);
  //console.log(ids);
  socket.join('room')   //see roome for differents channels => https://socket.io/docs/v3/rooms/



  socket.on('disconnect', (reason) => {
    console.log(socket.username + ' has disconnected!');
    let playerObject = {
      id: socket.id,
      name: socket.username
    }
    let arg = io.engine.clientsCount;
    io.emit('test', arg);
/* 
    let index = 0;  //find index in playersArray
    console.log(players);
    while(players[index].id !== playerObject.id){
      index++
      if(index > players.length){
        break;
      }
    }

    playersDisconnected.push(players[index]); //keeps track of who left
    players.splice(index, 1);   //remove the disconnected player
     */
    io.emit('players', players);  //send updated list to everyone
  })

  socket.on('game-settings', (gameSettings) => {
    console.log('received game settings');
    console.log(gameSettings);
  })

  socket.on('new-game', (tableId) => {
    console.log(tableId);
    io.emit('test', tableId);
  })
  

  

  socket.on('join-room', ({ name }) => {
    //console.log(idLocal);
    //console.log(id);
    socket.username = name;
    let playerObject = {
      id: socket.id,
      name: name,
    }
    players.push(playerObject);

    io.emit('players', players);
    //socket.in('room').emit('players', players);
  })


  socket.on('send-message', ({ recipients, text }) => {
    console.log('emit send message');
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })

  
})

