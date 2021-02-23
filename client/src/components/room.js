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


function Room({ id, name }) {
    const [joined, setJoined] = useState()
    const [players, setPlayers] = useState([]);
    const socket = useSocket();
    const classes = useStyles();


    useEffect(() => {
        let playerObject = {
            id: id,
            name: name
        };
        if(socket){
            if (joined !== true) {
                socket.emit('join-room', { name, id });
                setJoined(true);
            }
            console.log(socket);
            console.log(store.getState());
            socket.on('test', (arg) => {
                console.log('this is disconnect socket');
                console.log(arg);
            });
            socket.on('player-left', (playerObject) => {
                console.log('A user has left the game');
                console.log(playerObject);
            })
            socket.on('players', (players) => {
                console.log('Players in game');
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
        players.map((player, index) => {
            return(
                <Card elevation={5} className={classes.card}>
                    <Typography>{player.name}</Typography>
                </Card>
            )
        })
        
    )
}

export default Room;