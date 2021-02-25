import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useState } from 'react';
import store from '../redux/store';
import { Card, Typography, Box } from '@material-ui/core';
import { updatePlayers } from '../redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { TableTop } from './graphic/tableTop';
import Player from './player';

const useStyles = makeStyles({
    tableContainer:{
        height:'100vh',
        width:'100vw',
        overflow:'hide',
        //backgroundColor:'blue',
        overflow:'hidden',
    },
    card:{
        height:200,
        width:200,
        padding:5
    },
    tableTop:{
        //doesn<t work stop trying dude
    },
    text:{
        position:'absolute'
    },
    player:{
    }
})


export default function Table({ tableId, gameSettingsProps }) {
    const socket = useSocket();
    const classes = useStyles();
    const [players, setPlayers] = useState();
    const [gameSettings, updateGameSettings] = useState(gameSettingsProps);

    
    function populateTable(){

    }

    if(socket){
        socket.on('players', (arg) => {
            console.log(arg);
            //setPlayers(arg);
            //console.log(players)
            
        });
        socket.on('game-settings', (gameSettings) => {
            console.log(gameSettings);
        })
    }

    return (
        <Box className={classes.tableContainer}>
            <Player x={-0.75} className={classes.player}></Player>
            <TableTop className={classes.tableTop}></TableTop>
            <Typography className={classes.text}>THIS IS ROOM</Typography>



        </Box>
    )
}

/* function Table({ playerObject }) {
    const [joined, setJoined] = useState()
    const [players, setPlayers] = useState([]);
    const socket = useSocket();
    const classes = useStyles();


    useEffect(() => {
        console.log(playerObject);
        console.log('this is ROOM');
        if(socket){
            if (joined !== true) {
                let name = playerObject.name;
                socket.emit('join-table', { name, id });
                setJoined(true);
            }
            console.log(socket);
            console.log(store.getState());
            socket.on('test', (arg) => {
                //console.log('this is disconnect socket');
                console.log(arg);
            });
            socket.on('player-left', (playerObject) => {
                console.log('A user has left the game');
                console.log(playerObject);
            })
            socket.on('players', (players) => {
                console.log('Players in game');
                console.log(players);
                store.dispatch(updatePlayers(players));
                console.log(store.getState());
                setPlayers(players);
            })
        }
        
        console.log(socket);
        //socket.emit('test', 'This is some test data');
        //socket.emit('join-room', playerObject);
    }, [socket])

    //emit le id du player quand il join la room.
    // quand les autres recoivent le emit, ils envoyent leur id
    //each player has a list of all players and their info on redux store

    return (
        <Typography>THIS IS ROOM</Typography>
        
        
    )
}

export default Room; */