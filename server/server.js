const Table = require('./table');
const Player = require('./Player');

const io = require('socket.io')(5000)

let players = [];
playersDisconnected = [];
ids = [];

class Server{
  constructor(){
    this.casino = []; //tableArray
    this.disconnectedPlayers = [];

  }
  addTable(tableId, gameSettings, id){
    this.casino.push(new Table(tableId, gameSettings, id));
    console.log(this.casino);
  }

  //crash si table n<existe pas
  addPlayerToTable(player, tableId){
    let index = this.findTable(tableId);
    if(index){
      player.balance = this.casino[index].gameSettings.defaultBuyIn;
      for(let i = 0; i < this.casino[index].disconnectedPlayers.length; i++){
        if(player.name === this.casino[index].disconnectedPlayers[i].name){
          let oldPlayer = this.casino[index].disconnectedPlayers.splice(i, 1)[0];
          oldPlayer.id = player.id;
          player = oldPlayer;
        }
      }
    }
    this.casino[index].players.push(player);
    this.updateClients(tableId);
  }
  
  findTable(tableId){
    for(let i = 0; i < this.casino.length; i++){
      if(this.casino[i].id === tableId){
        return i;
      }
    }
  }

  updateClients(tableId){
    let index = this.findTable(tableId);
    let clientPlayers = this.casino[index].GetClientPlayersArray();
    io.in(tableId).emit('players', clientPlayers);
    io.in(tableId).emit('pot', this.casino[index].totalPot);
  }

  removeDisconnected(socket){
    //transfer host DONE - SIM
    let index = this.findTable(socket.tableId);
    if(index !== undefined){
      for(let i = 0; i < this.casino[index].players.length; i++){
        if(this.casino[index].players[i].id === socket.id){
          this.casino[index].disconnectedPlayers.push(this.casino[index].players[i]);
          this.casino[index].players.splice(i, 1);
          if(this.casino[index].host === socket.id && this.casino[index].players.length !== 0){   //if i==0 ? si tt va comme prevu
            this.casino[index].host = this.casino[index].players[0].id;   //might be useless
          }
          //ne pas envoyer les cartes!!! Done - ced
          this.updateClients(socket.tableId);
        }
      }
    }
  }

  

}
const server = new Server();




io.on('connection', (socket) => {
  console.log('New connection!!!');
  socket.join('casino')   //see roome for differents channels => https://socket.io/docs/v3/rooms/

  //gucci
  socket.on('create-table', ({ name, tableId, gameSettings }) => {
    let id = socket.id;                                    //client socket.id
    socket.tableId = tableId;
    socket.join(tableId);                              //join tableId room socket.io
    server.addTable({ tableId, gameSettings, id });                                  //create table
    console.log('ON CREATE-TABLE');
    console.log(name);
    let player = new Player(name, id);
    console.log('this is player to send');
    console.log(player);
    server.addPlayerToTable(player, tableId)
    //io.in(tableId).emit('game-settings', gameSettings);      //emit gameSettings to everyone

  })

  //cath when player try to join a table that doesnt exist
  socket.on('join-table', ({ name, tableId }) => {
    let id = socket.id;                                        //add tableId to joinObject
    socket.tableId = tableId;
    socket.join(tableId);   
    let player = new Player(name, id);                               //join tableId room socket.io
    server.addPlayerToTable(player, tableId);
  })


  socket.on('casino', () => {
    console.log('should send back casino');
    socket.emit('casinoCallback', server.casino);
  })



  socket.on('start-game', (tableId) => {
    console.log(tableId);
    let index = server.findTable(tableId);
    server.casino[index].NewRound();
    console.log('start game');
  })



  socket.on('game-settings', (gameSettings) => {
    console.log('received game settings');
    console.log(gameSettings);
  })

  socket.on('check', ({tableId}) => {
    let index = server.findTable(tableId);
    server.casino[index].Check();
    server.casino[index].NextTurn();
    server.updateClients(tableId);
  }) 

  socket.on('fold', ({tableId}) => {
    let index = server.findTable(tableId);
    server.casino[index].Fold();
    server.casino[index].NextTurn();
    server.updateClients(tableId);
  }) 

  socket.on('raise', ({tableId,raise}) => {
    let index = server.findTable(tableId);
    server.casino[index].Raise(raise);
    server.casino[index].NextTurn();
    server.updateClients(tableId);
  }) 

  socket.on('call', ({tableId,raise}) => {
    let index = server.findTable(tableId);
    server.casino[index].Call();
    server.casino[index].NextTurn();
    server.updateClients(tableId);
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

