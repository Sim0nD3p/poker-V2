import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useState } from 'react';
import store from '../redux/store';
import { Card, Typography } from '@material-ui/core';
import { updatePlayers } from '../redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card:{
        height:200,
        width:200,
        padding:5
    }
})


export default function Table({ tableId, gameSettingsProps }) {
    const socket = useSocket();
    const classes = useStyles();
    const [players, addPlayers] = useState([]);
    const [gameSettings, updateGameSettings] = useState(gameSettingsProps);

    socket.on('players', (players) => {
        console.log(players);
    })

    useEffect(() => {
        console.log('THIS IS TABLE');

    })
    function getPlayers() {

    }

    return (
        <Typography>THIS IS ROOM</Typography>
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