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
import { theme } from '../theme';
import socketIOClient from "socket.io-client";

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
    },
    button:{
        zIndex:1000
    }
})

const io = require("socket.io-client");

//faut pouvoir call, check d'avance
//call, raise? faut que ca soit clair et facile(lipoker bug en criss tabarnak)
const tempFlop = ['03S', '12H', '05D', '13C', '14S'];
const ENDPOINT = 'http://192.168.1.13:5000/';

export default function Table(props) {
    const classes = useStyles();
    const [players, setPlayers] = useState([]);
    const [clientIsHost, setClientIsHost] = useState(false);
    const [clientId, setClientId] = useState();
    const [flop, setFlop] = useState(tempFlop);
    const [clientIsTurn, setClientIsTurn] = useState(false);
    const [currentBet, setCurrentBet] = useState(0);
    const [call, setCall] = useState(null);
    
    //const [tableId, setTableId] = useState();
    //const [hiddenLogin, setHiddenLogin] = useState(true);
    const [gameOn, setGameOn] = useState(false);
    //const [gameSettings, updateGameSettings] = useState(gameSettingsProps);

    console.log('render table.js');
    const tempPlayer = {
        name:'Player1'
    }
    function shitDick(e){
        console.log('IT WORKED!!!');
        console.log(e);
    }
    useEffect(() => {
        console.log('useEffect Table.js');
        const socket = io("http://localhost:5000", {
            withCredentials: true,
        });
        console.log(socket);
        socket.on('connect', () => {
            console.log(socket.id);
            
        })
        socket.on('players', (players) => {
            shitDick(players);
            console.log(players);
        })
        //socket.emit('update-players', 'players');
    }, [])
    useEffect(() => {
        console.log(`This is clientName in Table.js ${props.clientName}`);
        console.log(`This is tableId in Table.js ${props.tableId}`);
    }, [props.clientName, props.tableId]);
    
    
    function testFunction(){
        console.log('this is testFunction');
        setGameOn(true);
        console.log(gameOn);

    }

   
            


                //let client = clientPlayers[clientIndex];
                //setClientIsTurn(client.isTurn);
                //setCurrentBet(client.currentBet);
                //let fromClient = clientPlayers.slice(clientIndex);
                //let toClient = clientPlayers.slice(0, clientIndex);
                //let players = fromClient.concat(toClient);
                //setPlayers(players);

                
                
                //add bet/raise on table when a player bet/raise
                //set current bet and client infos before checking call/check shit
                //send info call/check to control and display button accordingly
                //button logic (faire les call d'avance), disable raison when isTurn==false
                //change this to keep the playing order right
        
        return (
        <Box className={classes.tableContainer}>

            {props.clientName ? null : <LoginFromUrl
                submitName={props.submitName}
                submitTableId={props.submitTableId}></LoginFromUrl>
            }
            
            <TableContent
            pot='pot'
            flop={flop}
            ></TableContent>
            
            <Controls
            call={call}
            clientIsHost={clientIsHost}
            gameOn={gameOn}
            tableId={props.tableId}
            clientIsTurn={clientIsTurn}
            players = {players}
            testFunction={testFunction}
            ></Controls>   {/**props= some kind of state for call/check and raise */}

            {players.map((player, i) => {
                let positions = playerPosition(players.length);
                let x = positions[i][0];
                let place = positions[i][1];
                return (
                    <Player
                    player={player}
                    key={i}
                    x={x}
                    placement={place}
                    ></Player>
                )
            })}
            <TableTop className={classes.tableTop}></TableTop>
        </Box>
    )
}

