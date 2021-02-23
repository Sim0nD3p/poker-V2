import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import Test from './test'
import { Container, Button, Input, TextField, Paper } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { withStyles } from '@material-ui/core';
import { useSocket } from '../contexts/SocketProvider';
import Room from './room';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

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

/**
 * Initial screen: newGame | joinGame
 * newGame: create game with new gameId
 * joinGame: ask for game id and join the room with the game id
 * @param {*} param0 
 */
function InitialScreen({ submitName, submitGameId }){
  const classes = useStyles();
  const [newGame, isNewGame] = useState(true);
  let name;
  let gameId;
  function createGame(){  //createGame, will create and join the game with new gameId
    console.log('create game');
    submitName(name);
    submitGameId('gameId');   //DEAL WITH GAMEID (link?, router?)(randomString?)(displayToUser?)
  }
  function getName(e){  //get name from textField (input)
    //if(newGame == true){
      name = e.target.value;
    //}
  }
  function getGameId(e){  //get gameId from textField (input)
    gameId = e.target.value;
  }
  function joinGame(){    //will run 2 times (when the user chose to join game and after he enters the gameId)
    console.log('join game');
    isNewGame(false);   //will now render joinGame interface
    if(name){     //submit name to app component (1st time it runs), will be undefined the 2nd time it runs(textField doesnt exist anymore)
      submitName(name);
    }
    //submit the gameId to app component (2nd time it runs)
    if(gameId !== undefined && gameId !== null && gameId !== ''){   //just to be sure it doesnt go to shit
      submitGameId(gameId);
    }
  }
  function back(){    //go back if user changes mind
    isNewGame(true);
  }
  //Initial screen with 2 options (createGame, joinGame)
  function Initial() {
    return (
      <Paper elevation={5} className={classes.container}>
        <TextField
          className={classes.textField}
          onChange={getName}
          variant='outlined'></TextField>
        <Button
          className={classes.button}
          variant='outlined'
          onClick={joinGame}
        >Join game</Button>
        <Button
          className={classes.button}
          onClick={createGame}
          variant='outlined'
        >Create new game</Button>
      </Paper>
    )
  }
  //2nd screen when user wants to join game; ask for gameId
  function JoinGame() {
    return(
    <Paper
      elevation={5}
      className={classes.container}
    >
      <ArrowBack onClick={back}></ArrowBack>

      <TextField
        onChange={getGameId}
        className={classes.textField}
        variant='outlined'></TextField>
      <Button
        className={classes.button}
        variant='outlined'
        onClick={joinGame}>Join game</Button>

    </Paper>
    )
  }
    return (
      newGame ? <Initial submitName={submitName}/> : <JoinGame submitName={submitName} submitGameId={submitGameId}/>
        
    )
}


function SocketEnv({ playerObject }) {
  //id might be useless
  console.log(playerObject);
  return (
    <SocketProvider id={playerObject.id}>
    
      <Room playerObject={playerObject}></Room>
    </SocketProvider>
  )
}


function App(){
  const [id, setId] = useState('thisIsIdBruh');
  const [name, setName] = useState();
  const [gameId, getGameId] = useState();
  const [playerObject, setPlayerObject] = useState();

  //runs everytime name or gameId get updated
  useEffect(() => {
    console.log('update on name or gameId');
    
    setPlayerObject({
      id: id,
      name, name,
      gameId: gameId
    });
    if(gameId){
      store.dispatch(addPlayer(playerObject));
      console.log(store.getState());  
    }
    console.log(playerObject);
  }, [name, gameId]);  
  return (
    gameId ? <SocketEnv id={id} playerObject={playerObject}/> : <InitialScreen submitName={setName} submitGameId={getGameId} />
  )
}




export default App;
