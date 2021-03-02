import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import { Container, Button, Input, TextField, Paper } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { withStyles } from '@material-ui/core';
import { useSocket } from '../contexts/SocketProvider';
import Room from './Table';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { ArrowBack, SettingsSystemDaydreamOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { addPlayer } from '../redux/actions/actions';
import { Socket } from 'socket.io-client';

const useStyles = makeStyles({
    container: {
        margin: 'auto',
        marginTop: 10,
        display: 'flex',
        width: 500,
        padding: 10,
        flexDirection: 'column',
    },
    textField: {
        margin: 10
    },
    button: {
        margin: 10,
    }
})

function JoinGame({ submitId, submitBack, name }) {
    const socket = useSocket();
    const classes = useStyles();
    const [tableId, setTableId] = useState();
    const [go, setGo] = useState(false);
    var tableIdStr = '';

    
    
    function getGameId(e){
        setTableId(e.target.value);
    }
    function joinGame(){
        //console.log(tableIdStr);
        //setTableId(tableIdStr);
        console.log(tableId)
        setGo(true)
        

        console.log('should emit from initialScreen');
        socket.emit('join-table', ({ name, tableId }));
    }
    function back(){
        submitBack(true);
    }

    useEffect(() => {
        if(go === true){
            submitId(tableId);
        }
        console.log(tableId);
    }, [tableId, go])
    return (
        <Paper
            elevation={5}
            className={classes.container}
        >
            <ArrowBack onClick={back} color='primary'></ArrowBack>

            <TextField
                onChange={getGameId}
                className={classes.textField}
                variant='outlined'
                color='primary'>

            </TextField>
            <Link onClick={event => (!tableId) ? event.preventDefault() : null} to={`/table?id=${tableId}`}>
                <Button
                    className={classes.button}
                    variant='outlined'
                    color="primary"
                    onClick={joinGame}>Join game</Button>


            </Link>






        </Paper>
    )
}

/**
* Initial screen: newGame | joinGame
* newGame: create game with new gameId
* joinGame: ask for game id and join the room with the game id
* @param {*} param0 
*/
export default function InitialScreen({ submitName, submitGameId, submitPlayerObject }) {
    const classes = useStyles();
    const socket = useSocket();
    const [newGame, isNewGame] = useState(true);
    const [name, setName] = useState('');
    const [tableId, setTableId] = useState('');
    var nameStr = '';
    var idStr = '';
    function createGame() {  //createGame, will create and join the game with new gameId
        console.log('create game');
        setName(nameStr);
        console.log(nameStr);
        submitName(nameStr);
        //submitGameId('gameId');   //DEAL WITH GAMEID (link?, router?)(randomString?)(displayToUser?)
    }
    function getName(e) {  //get name from textField (input)
        nameStr = e.target.value;
    }
    function getGameId(e) {  //get gameId from textField (input)
        idStr = e.target.value;
    }
    function saveName(){
        isNewGame(false);   //needed to render the good interface(see return)
        setName(nameStr);
        submitName(name);
    }
    function joinGame() {    //will run 2 times (when the user chose to join game and after he enters the gameId)
        console.log('join game');
        setTableId(idStr);
        
        console.log(name);
        console.log(tableId);
        
    }
    function back() {    //go back if user changes mind
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
                    variant='outlined'
                    color='primary'></TextField>
                <Button
                    className={classes.button}
                    variant='outlined'
                    color='primary'
                    onClick={saveName}
                >Join game</Button>
                <Link onClick={event => (!nameStr) ? event.preventDefault() : null} to={'/createTable'}>
                    <Button
                        className={classes.button}
                        onClick={createGame}
                        variant='outlined'
                        color='primary'
                    >Create new game</Button>
                </Link>
            </Paper>
        )
    }
    //2nd screen when user wants to join game; ask for gameId
    
    return (
        newGame ? <Initial submitName={submitName} /> : <JoinGame name={name} submitBack={isNewGame} submitId={setTableId} />

    )
}