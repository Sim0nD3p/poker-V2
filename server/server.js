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
  findTable(tableId){
    for(let i = 0; i < this.casino.length; i++){
      if(this.casino[i].id == tableId){
        return i;
      }
    }
  }


  removeDisconnected(socket){
    //transfer host
    console.log(socket.id);
    let index = this.findTable(socket.tableId);
    console.log(index);
    if(index !== undefined){
      for(let i = 0; i < this.casino[index].players.length; i++){
        if(this.casino[index].players[i].id === socket.id){
          this.casino[index].players.splice(i, 1);
          let players = this.casino[index].GetClientPlayersArray();
          //ne pas envoyer les cartes!!! Done - ced
          io.in(tableId).emit('players', players);
        }
      }
    }
    //console.log(`${socket.id} left table ${socket.tableId}`);
  }

  updateClients(tableId){
    io.in(tabledId).emit('players', this.casino[tableId].GetClientPlayersArray());
  }

}
const server = new Server();




io.on('connection', (socket) => {
  console.log('New connection!!!');
  socket.join('casino')   //see roome for differents channels => https://socket.io/docs/v3/rooms/

  //gucci
  socket.on('create-table', ({ name, tableId, gameSettings }) => {
    let id = socket.id;                                    //client socket.id
    server.addTable({ tableId, gameSettings, id });                                  //create table
    socket.join(tableId);                              //join tableId room socket.io
    socket.tableId = tableId;
    let index = server.findTable(tableId);               //find index of table in casino
    server.casino[index].players.push(new Player({ name, id }));    //add player to table
    io.in(tableId).emit('players', server.casino[index].players);                 //emit players to everyone
    io.in(tableId).emit('game-settings', gameSettings);      //emit gameSettings to everyone

  })

  //cath when player try to join a table that doesnt exist
  socket.on('join-table', ({ name, tableId }) => {
    socket.join(tableId);                                  //join tableId room socket.io
    socket.tableId = tableId;
    let id = socket.id;                                        //add tableId to joinObject
    let index = server.findTable(tableId);                   //find index of table in casino
    server.casino[index].players.push(new Player({name, id}));        //add player to table in casino
    io.in(tableId).emit('players', server.casino[index].players);                 //emit players to everyone
    io.in(tableId).emit('game-settings', server.casino[index].gameSettings);      //emit gameSettings to everyone


    //playerId socket.it, tableId, 



  })

  socket.on('start-game', ({tableId}) => {
    let index = server.findTable(tableId);
    server.casino[index].NewRound();
  })



  socket.on('game-settings', (gameSettings) => {
    console.log('received game settings');
    console.log(gameSettings);
  })

  socket.on('check', ({tableId}) => {
    let index = server.findTable(tableId);
    server.casino[index].Check();
  }) 

  socket.on('fold', ({tableId}) => {
    let index = server.findTable(tableId);
    server.casino[index].Fold();
  }) 

  socket.on('raise', ({tableId,raise}) => {
    let index = server.findTable(tableId);
    server.casino[index].Raise(raise);
  }) 

  socket.on('call', ({tableId,raise}) => {
    let index = server.findTable(tableId);
    server.casino[index].Call();
  }) 

  socket.on('buyIn', ({tableId,playerName,buyIn}) => {
    let index = server.findTable(tableId);
    server.casino[index].BuyIn(playerName,buyIn);
  }) 

  socket.on('disconnect', (arg) => {
    server.removeDisconnected(socket);
    /* let index = server.findTable(socket.tableId);
    let players = server.casino[index].players;
    for(let i = 0; i < players.length; i++){
      if(players[i].id == socket.id){
        players.splice(i, 1);
        break;
      }
    } */
    
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

