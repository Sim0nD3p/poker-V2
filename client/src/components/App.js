import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import { Container, Button, Input, TextField, Paper } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { withStyles } from '@material-ui/core';
import { useSocket } from '../contexts/SocketProvider';
import Table from './Table';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import InitialScreen from './initialScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreateTable from './createTable';




import { addPlayer } from '../redux/actions/actions';
import { Socket } from 'socket.io-client';

const useStyles = makeStyles({
  container:{
    margin:'auto',
    marginTop:10,
    display:'flex',
    width:500,
    padding:10,
    flexDirection:'column',
  },
  textField:{
    margin:10
  },
  button:{
    margin:10,
  }
})
//fsdfsd





function SocketEnv({ playerObject, newGameId }) {
  //id might be useless
  console.log(playerObject);
  const socket = useSocket();
  console.log(newGameId);
  
  const url = `/table?id=${newGameId}`
  console.log('Creating route ' + url);

  
  socket.on('new-game', (arg) => {
    console.log('this is new-game');
    console.log(arg);
});
//path={`/table?id=${newGameId}`}

  
  return (
    null
    
      
  )
}

//screen => createGame
//url de la game
//share id du socket
//define host

const defaultSettings = {
  gameMode: 'cash', //drink, cash
  timer: null,  //whatever timer
  smallB: 1,
  defaultBuyIn: 100,
}


function App(){
  //const [id, setId] = useState('thisIsIdBruh');
  const [name, setName] = useState();
  const [tableId, setTableId] = useState();
  const [gameSettings, setGameSettings] = useState(defaultSettings);
  const [goToRoom, letsGoToRoom] = useState(false);
  const [playerObject, setPlayerObject] = useState();
  const socket = useSocket();

  //runs everytime name or gameId get updated
  useEffect(() => {
    console.log('update on name or gameId');
    console.log(gameSettings);
    console.log(name);
    console.log(tableId);


    //maybe only have a playerObject without name and table id passed everywhere is a good idea
    setPlayerObject({
      //id: id,
      name, name,
      gameId: tableId
    });
    if(tableId){
      store.dispatch(addPlayer(playerObject));
      console.log(store.getState());  
    }
  }, [name, tableId, gameSettings]); 
/* 
  if(gameId && name && goToRoom == true){
    return (
      <SocketProvider>
        <SocketEnv newGameId={gameId} playerObject={playerObject}></SocketEnv>
      </SocketProvider> 
    )
  } else { */
    
    return (
      <SocketProvider>
        <Router>
          <Route path='/table'>
            <Table
              submitClient={setPlayerObject}
              client={playerObject}
              tableId={tableId}
              gameSettings={gameSettings}
            ></Table>
          </Route>

          <Route path='/' exact>
            <InitialScreen
              submitPlayerObject={setPlayerObject}
              submitName={setName}
              submitGameId={setTableId}
            ></InitialScreen>
          </Route>

          <Route path='/createTable'>
            <CreateTable
              name={name}
              submitGoToRoom={letsGoToRoom}
              submitGameId={setTableId}
              defaultSettings={defaultSettings}
              submitGameSettings={setGameSettings}
            ></CreateTable>
          </Route>
        </Router>
      </SocketProvider>
  )

}
//{gameId ? <SocketEnv id={id} playerObject={playerObject}/> : <InitialScreen submitName={setName} submitGameId={getGameId} />}




export default App;
