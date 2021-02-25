const Table = require('./table');
const Player = require('./Player');

const io = require('socket.io')(5000)

let players = [];
playersDisconnected = [];
ids = [];

class Server{
  constructor(){
    this.casino = []; //tableArray

  }
  addTable(table){
    this.casino.push(new Table(table))
    console.log('this is casino');
    console.log(this.casino);
  }
}
const server = new Server();


function findTableIndex(tableId){
  //nlet tables = server.casino;
  let index = 0;
  if(server.casino){
    while(server.casino[index].id !== tableId){
      index++;
      if(index > server.casino.length){
        break;
      }
    }
  }
  return index;
}



io.on('connection', (socket) => {
  console.log('New connection!!!');
  socket.join('casino')   //see roome for differents channels => https://socket.io/docs/v3/rooms/

  socket.on('create-table', (newTableObject) => {
    newTableObject.id = socket.id;                                    //client socket.id
    server.addTable(newTableObject);                                  //create table
    socket.join(newTableObject.tableId);                              //join tableId room socket.io
    socket.tableId = newTableObject.tableId;
    let index = findTableIndex(newTableObject.tableId);               //find index of table in casino
    server.casino[index].players.push(new Player(newTableObject));    //add player to table
    io.in(newTableObject.tableId).emit('players', server.casino[index].players);                 //emit players to everyone
    io.in(newTableObject.tableId).emit('game-settings', server.casino[index].gameSettings);      //emit gameSettings to everyone

  })

  socket.on('join-table', (joinObject) => {
    socket.join(joinObject.tableId);                                  //join tableId room socket.io
    socket.tableId = joinObject.tableId;
    joinObject.id = socket.id;                                        //add tableId to joinObject
    let index = findTableIndex(joinObject.tableId);                   //find index of table in casino
    server.casino[index].players.push(new Player(joinObject));        //add player to table in casino
    io.in(joinObject.tableId).emit('players', server.casino[index].players);                 //emit players to everyone
    io.in(joinObject.tableId).emit('game-settings', server.casino[index].gameSettings);      //emit gameSettings to everyone


  })
  

  socket.on('game-settings', (gameSettings) => {
    console.log('received game settings');
    console.log(gameSettings);
  })


  socket.on('disconnecting', (arg) => {
    let index = findTableIndex(socket.tableId);
    let players = server.casino[index].players;
    for(let i = 0; i < players.length; i++){
      if(players[i].id == socket.id){
        players.splice(i, 1);
        break;
      }
    }
    io.in(socket.tableId).emit('players', players);
  })
  

  

 /*  socket.on('join-room', ({ name }) => {
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
  }) */


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

