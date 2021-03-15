const Table = require('./table');
const Player = require('./Player');

//const io = require('socket.io')(5000)
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

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
    if(index >= 0) {
      player.balance = this.casino[index].gameSettings.buyIn;
      for (let i = 0; i < this.casino[index].disconnectedPlayers.length; i++) {
        if (player.name === this.casino[index].disconnectedPlayers[i].name) {
          let oldPlayer = this.casino[index].disconnectedPlayers.splice(i, 1)[0];
          oldPlayer.id = player.id;
          player = oldPlayer;
        }
      }
      console.log(player);
      this.casino[index].players.push(player);
      //this.updateClients(tableId);  ->clients updated when socket joins in Table.js
    }
    else{
      console.log("Error in addPlayerToTable");
    }
  }
  
  findTable(tableId){
    let tableIndex = -1;
    for(let i = 0; i < this.casino.length; i++){
      if(this.casino[i].id === tableId){
        tableIndex = i;
      }
    }
    return tableIndex
  }

  updateClients(tableId){
    let index = this.findTable(tableId);
    console.log(index);
    if(index >= 0){
      let clientPlayers = this.casino[index].GetClientPlayersArray();
      //let hostId = this.casino[index].host;
      console.log('update clients');
      io.in('casino').emit('players', clientPlayers);
      io.in(tableId).emit('pot', this.casino[index].totalPot);
      io.in(tableId).emit('flop', this.casino[index].CardsOnTable);
      if(this.casino[index].updateCardsInHand)
      {
        for(let i=0;i<server.casino[index].players.length;i++)
        {
          io.to(server.casino[index].players[i].id).emit('cards-in-hand',server.casino[index].players[i].cardsInHand);
        }
      }

    }
  }

  removeDisconnected(socket){
    //transfer host DONE - SIM
    //remove table if no one is left
    let index = this.findTable(socket.tableId);
    if(index >= 0){
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
  console.log(socket.id);
  socket.join('casino')   //see roome for differents channels => https://socket.io/docs/v3/rooms/

  //get client upon connection of socket listener in Table.js, send players to client(as soon when we can)
  socket.on('join-socket-room', (tableId) => {
    socket.join(tableId);
    server.updateClients(tableId);
  })


  //gucci
  socket.on('create-table', (name, tableId, gameSettings) => {
    let id = socket.id;                                    //client socket.id
    socket.tableId = tableId;
    console.log(socket.id);
    socket.join(tableId);                              //join tableId room socket.io
    server.addTable(tableId, gameSettings, id);                                  //create table
    console.log('ON CREATE-TABLE');
    console.log(name);
    let player = new Player(name, id);
    console.log('this is player to send');
    console.log(player);
    server.addPlayerToTable(player, tableId)
    //io.in(tableId).emit('game-settings', gameSettings);      //emit gameSettings to everyone

  })
  

  socket.on('update-players', (tableId) => {
    server.updateClients(tableId);
    console.log('client ask to be updated');
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
    socket.in('casino').emit('casinoCallback', server.casino);
  })



  socket.on('start-game', (tableId) => {
    console.log(tableId);
    let index = server.findTable(tableId);
    server.casino[index].StartGame();
    console.log('start game');

    server.updateClients(tableId);


    io.in(tableId).emit('game-started');
  })



  socket.on('game-settings', (gameSettings) => {
    //console.log('received game settings');
  })

  socket.on('check', (tableId) => {
    let index = server.findTable(tableId);
    server.casino[index].Check(socket.id);
    server.casino[index].NextTurn(socket.id);
    server.updateClients(tableId);
  }) 

  socket.on('fold', (tableId) => {
    let index = server.findTable(tableId);
    server.casino[index].Fold(socket.id);
    server.casino[index].NextTurn(socket.id);
    server.updateClients(tableId);
  }) 

  socket.on('raise', (tableId, raise) => {
    console.log(`this is raise`);
    console.log(tableId);
    console.log(server.casino);
    let index = server.findTable(tableId);
    console.log(index);
    console.log(server.casino[index]);
    server.casino[index].Call(socket.id)
    server.casino[index].Raise(raise, socket.id);
    server.casino[index].NextTurn(socket.id);
    server.updateClients(tableId);
  }) 

  socket.on('call', (tableId) => {
    let index = server.findTable(tableId);
    server.casino[index].Call(socket.id);
    server.casino[index].NextTurn(socket.id);
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

