import Table from './table';
const io = require('socket.io')(5000)

let players = [];
playersDisconnected = [];
ids = [];

class Server{
  constructor(){
    this.casino = []; //tableArray

  }
  addTable(table){
    let id = table.id
    this.casino.push(id);
    let table = this.caniso.id;
    console.log(this.casino);
  }
}

const server = new Server();


io.on('connection', (socket) => {
  console.log('New connection!!!');
  //const id = socket.handshake.query.id;
  //ids.push(id);
  //console.log(socket);
  //console.log(ids);
  socket.join('room')   //see roome for differents channels => https://socket.io/docs/v3/rooms/

  socket.on('create-table', (newGameObject) => {
    console.log(newGameObject);
    
    server.addTable();

  })



  socket.on('disconnect', (reason) => {
    console.log(socket.username + ' has disconnected!');
    let playerObject = {
      id: socket.id,
      name: socket.username
    }
    let arg = io.engine.clientsCount;
    io.emit('test', arg);
    io.emit('players', players);  //send updated list to everyone
  })

  socket.on('game-settings', (gameSettings) => {
    console.log('received game settings');
    console.log(gameSettings);
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

