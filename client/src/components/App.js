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

function InitialScreen({ submitName, submitGameId }){
  const classes = useStyles();
  const [newGame, isNewGame] = useState(true);
  let name;
  let gameId;
  function createGame(){
    console.log('create game');
    console.log(name);
    submitName(name);
    submitGameId('gameId');

  }
  function getName(e){
    if(newGame == true){
      name = e.target.value;
      console.log(name);
    }
  }
  function getGameId(e){
    gameId = e.target.value;
    console.log(gameId);
  }
  function joinGame(){
    console.log('join game');
    isNewGame(false);
    console.log(name);
    console.log(gameId);
    if(name){
      submitName(name);
    }
    if(gameId !== undefined && gameId !== null && gameId !== ''){

      console.log('gameId defined');
      submitGameId(gameId);
      console.log(name)
    }

  }
  function back(){
    isNewGame(true);

  }
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


function Content({ id, name }) {
  return (
    <SocketProvider id={id}>
      <Room name={name} id={id}></Room>

    </SocketProvider>
  )
}


function App(){
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [gameId, getGameId] = useState();

  useEffect(() => {
    console.log(name);
    console.log(gameId);
    console.log('useEffect main app');
    let playerObject = {
      id: id,
      name, name
    }
    if(name){
      store.dispatch(addPlayer(playerObject));
      console.log(store.getState());  
    }
  }, [name, gameId]);  
  return (
    gameId ? <Content id={id} name={name}/> : <InitialScreen submitName={setName} submitGameId={getGameId} />
  )
}




export default App;
