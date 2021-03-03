import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useState } from 'react';
import store from '../redux/store';
import { Card, Paper, Typography, TextField, Button, Box } from '@material-ui/core';
import { updatePlayers } from '../redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { TableTop } from './TableComponents/tableTop';
import Player from './player';
import playerPosition from './playerComponents/playerPosition';
import queryString from 'querystring';
import Controls from './TableComponents/Controls';
import TableContent from './TableComponents/tableContent';
import LoginFromUrl from './loginFromUrl';

const loginContainerSize = [400, 300];

const useStyles = makeStyles({
    tableContainer:{
        margin:0,
        padding:0,
        height:'100vh',
        width:'100vw',
        display:'flex',
        flexDirection:'column',
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
    },
    loginContainer: {
        width:loginContainerSize[0],
        height:loginContainerSize[1],
        position:'fixed',
        display:'flex',
        flexDirection:'column',
        zIndex:10000,
        left: ((window.innerWidth / 2) - (loginContainerSize[0] / 2)),
        top: (window.innerHeight / 2 - loginContainerSize[1] / 2),
    },
    header:{
        margin:'auto',
        marginTop:10,
        marginBottom:10,
    },
    nameInput:{
        margin:'auto',
        marginTop:10,
        marginBottom:10,
        width:'65%',
    },
    joinButton:{
        width:'65%',
        margin:'auto',
        marginTop:10,
    }
})
//faut pouvoir call, check d'avance
//call, raise? faut que ca soit clair et facile(lipoker bug en criss tabarnak)

export default function Table(props) {
    const socket = useSocket();
    const classes = useStyles();
    const [players, setPlayers] = useState([]);
    const [clientIsHost, setClientIsHost] = useState(false);
    const [clientId, setClientId] = useState();
    
    //const [tableId, setTableId] = useState();
    //const [hiddenLogin, setHiddenLogin] = useState(true);
    const [gameOn, setGameOn] = useState(false);
    //const [gameSettings, updateGameSettings] = useState(gameSettingsProps);

    const tempPlayer = {
        name:'Player1'
    }
    useEffect(() => {
        console.log(`This is clientName in Table.js ${props.clientName}`);
        console.log(`This is tableId in Table.js ${props.tableId}`);
    }, [props.clientName, props.tableId]);

    if(socket){
        if (clientId == undefined && socket.id !== undefined) { setClientId(socket.id); };
        socket.on('players', (clientPlayers, hostId) => {
            //let list = clientPlayers;
            let client;
            if(clientId === hostId){
                setClientIsHost(true);
            }
            for(let i = 0; i < clientPlayers.length; i++){
                console.log(i);
                if(clientPlayers[i].id === clientId){
                    client = clientPlayers.splice(i, 1)[0];
                    clientPlayers.splice(0, 0, client);
                    setPlayers(clientPlayers);
                    break;
                }
            }
        });
        socket.on('player-turn', (callback) => {
            console.log('playerTurn ' + callback);
        })
        
        /* socket.on('game-settings', (gameSettings) => {
            //console.log(gameSettings);

            
        }) */
    }

    return (
        <Box className={classes.tableContainer}>

            {props.clientName ? null : <LoginFromUrl
                submitName={props.submitName}
                submitTableId={props.submitTableId}></LoginFromUrl>
            }
            
            <TableContent></TableContent>

            <Controls
            clientIsHost={clientIsHost}
            gameOn={gameOn}
            tableId={props.tableId}
            players = {players}
            ></Controls>   {/**props= some kind of state for call/check and raise */}

            {players.map((player, i) => {
                let positions = playerPosition(players.length);
                let x = positions[i][0];
                let place = positions[i][1];
                return (
                    <Player player={player} key={i} x={x} placement={place}></Player>
                )
            })}

            <TableTop className={classes.tableTop}></TableTop>
        </Box>
    )
}


/*
{hiddenLogin ? null : <Login
                socket={socket}
                setHidden={setHiddenLogin}
                className={classes.login}
                ></Login>
            }
*/