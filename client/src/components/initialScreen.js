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
import { Link } from 'react-router-dom';

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
  export default function InitialScreen({ submitName, submitGameId }){
    const classes = useStyles();
    const [newGame, isNewGame] = useState(true);
    let name;
    let gameId;
    function createGame(){  //createGame, will create and join the game with new gameId
      console.log('create game');
      submitName(name);
      //submitGameId('gameId');   //DEAL WITH GAMEID (link?, router?)(randomString?)(displayToUser?)
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
                  label='Name'
                  variant='outlined'></TextField>
              <Button
                  className={classes.button}
                  variant='outlined'
                  onClick={joinGame}
              >Join game</Button>
              <Link onClick={event => (!name) ? event.preventDefault() : null} to='/createTable'>
                  <Button
                      className={classes.button}
                      onClick={createGame}
                      variant='outlined'
                  >Create new game</Button>
              </Link>
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