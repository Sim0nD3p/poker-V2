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
const tempFlop = ['03S', '12H', '05D', '13C', '14S'];

export default function Table(props) {
    const socket = useSocket();
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

    const tempPlayer = {
        name:'Player1'
    }
    useEffect(() => {
        console.log(`This is clientName in Table.js ${props.clientName}`);
        console.log(`This is tableId in Table.js ${props.tableId}`);
    }, [props.clientName, props.tableId]);

    function gameLogic(players, clientIndex, highestBet){

    }

    if(socket){
        if (clientId == undefined && socket.id !== undefined) { setClientId(socket.id); };
        if(clientId){

            socket.on('players', (clientPlayers, hostId) => {
                console.log(clientPlayers);
                if(clientId === hostId){ setClientIsHost(true) };
                //loop to check if game is on
                /* 
                let list = clientPlayers;
                let client;
                let bet = currentBet;
                for(let i = 0; i < clientPlayers.length; i++){
                    if(clientPlayers[i].currentBet > bet){
                        bet = clientPlayers[i].currentBet;
                    }
                }
                //call/check
                if(bet > currentBet){
                    setCall(bet);
                } else {
                    setCall(null);
                }
                */

                //setPlayers
                //setCurrentBet
                //setClientIsTurn
                //put clientPlayer in first position while keeping players playing order
                //setCall: null if no need to call(currentBet >= highestBet), to call amount if need to call
               let clientIndex;
               let highestBet = 0;
               for(let i = 0; i < clientPlayers.length; i++){
                   if(clientPlayers[i].id === clientId){
                       clientIndex = i;
                       //setClientIsTurn(clientPlayers[i].isTurn);
                       //setCurrentBet(clientPlayers[i].currentBet);
                    }
                    if(clientPlayers[i].currentBet > highestBet){
                        highestBet = clientPlayers[i].currentBet;
                    }
                }

                //gameLogic(clientPlayers, clientIndex, highestBet);
                if(clientPlayers[clientIndex].currentBet < highestBet){
                    setCall(highestBet);
                }
                else{
                    setCall(null);
                }
                let client = clientPlayers[clientIndex];
                setClientIsTurn(client.isTurn);
                setCurrentBet(client.currentBet);
                let fromClient = clientPlayers.slice(clientIndex);
                let toClient = clientPlayers.slice(0, clientIndex);
                let players = fromClient.concat(toClient);
                setPlayers(players);

                
                //add bet/raise on table when a player bet/raise
                //set current bet and client infos before checking call/check shit
                //send info call/check to control and display button accordingly
                //button logic (faire les call d'avance), disable raison when isTurn==false
                //change this to keep the playing order right
                
            });
        }
    }
        
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


/*
{hiddenLogin ? null : <Login
                socket={socket}
                setHidden={setHiddenLogin}
                className={classes.login}
                ></Login>
            }
*/