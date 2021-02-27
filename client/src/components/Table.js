import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useState } from 'react';
import store from '../redux/store';
import { Card, Paper, Typography, TextField, Button, Box } from '@material-ui/core';
import { updatePlayers } from '../redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { TableTop } from './graphic/tableTop';
import Player from './player';
import playerPosition from './graphic/playerPosition';
import queryString from 'querystring';

const loginContainerSize = [400, 300];

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
function Login({ submitClient, setHidden, socket }){
    const classes = useStyles();
    const [name, setName] = useState();
    const [tableId, setTableId] = useState();

    useEffect(() => {
        const parsed = queryString.parse(window.location.search);
        setTableId(parsed["?id"]);
    })
    
    function getNameInput(e){
        setName(e.target.value);
    }
    function joinTable(){
        let client = {
            name: name,
            tableId: tableId,
        }
        submitClient(client);
        socket.emit('join-table', ({ name, tableId }));
        setHidden(true);

    }

    return(
        <Paper
            elevation={5}
            className={classes.loginContainer}>
            <Typography
                variant='h4'
                className={classes.header}
            >Join table</Typography>
            <Typography
                variant='body1'
                style={{ margin: 'auto', marginTop: 10, marginBottom: 10 }}
            >Enter your user infos</Typography>
            <TextField
                variant='outlined'
                color='primary'
                label='name'
                onChange={getNameInput}
                className={classes.nameInput}
            ></TextField>
            <Button
            color='primary'
            variant='contained'
            onClick={joinTable}
            className={classes.joinButton}
            >PLAY</Button>
        </Paper>
    )
}


export default function Table({ tableId, gameSettingsProps, client, submitClient }) {
    const socket = useSocket();
    const classes = useStyles();
    const [players, setPlayers] = useState([]);
    const [hiddenLogin, setHiddenLogin] = useState();
    const [gameSettings, updateGameSettings] = useState(gameSettingsProps);

    
    function populateTable(){


    }
    function defineClient(){

    }
    useEffect(() => {
        console.log(client);
        if(client == undefined){
            setHiddenLogin(false);
        }

        function playersOnScreen() {
            let content = [];

                
                return content

        }
    }, [players, client])

    if(socket){
        socket.on('players', (players) => {
            console.log(players);
            setPlayers(players);
           // alert('new players');
            
            
        });
        socket.on('game-settings', (gameSettings) => {
            //console.log(gameSettings);
        })
    }

    return (
        <Box className={classes.tableContainer}>
            {hiddenLogin ? null : <Login
                socket={socket}
                setHidden={setHiddenLogin}
                className={classes.login}
                submitClient={submitClient}
            ></Login>
            }

            {players.map((player, i) => {
                let positions = playerPosition(players.length);
                let x = positions[i][0];
                let place = positions[i][1];
                return (
                    <Player player={player} key={i} x={x} placement={place}></Player>

                )
            })}
            

            <TableTop className={classes.tableTop}></TableTop>
            <Typography className={classes.text}>THIS IS ROOM</Typography>



        </Box>
    )
}