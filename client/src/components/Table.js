import React, { Profiler, useEffect } from 'react';
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
import SideBar from './sideBar';
import { GlobalHotKeys } from 'react-hotkeys';
import { keyMap } from './keyMap';


const loginContainerSize = [400, 300];

const useStyles = makeStyles({
    tableContainer: {
        margin: 0,
        padding: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor:'blue',
        overflow: 'hidden',
    },
    card: {
        height: 200,
        width: 200,
        padding: 5
    },
    tableTop: {
        //doesn<t work stop trying dude
    },
    text: {
        position: 'absolute'
    },
    player: {
    },
    loginContainer: {
        width: loginContainerSize[0],
        height: loginContainerSize[1],
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10000,
        left: ((window.innerWidth / 2) - (loginContainerSize[0] / 2)),
        top: (window.innerHeight / 2 - loginContainerSize[1] / 2),
    },
    header: {
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
    },
    nameInput: {
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        width: '65%',
    },
    joinButton: {
        width: '65%',
        margin: 'auto',
        marginTop: 10,
    },
    button: {
        zIndex: 1000
    }
})

const tempPlayer = {
    name: 'Player1'
}

const io = require("socket.io-client");

//faut pouvoir call, check d'avance
//call, raise? faut que ca soit clair et facile(lipoker bug en criss tabarnak)
const tempFlop = ['null', 'null', 'null', 'null', 'null'];
const ENDPOINT = 'http://192.168.1.13:5000/';

export default function Table(props) {
    const classes = useStyles();
    const [players, setPlayers] = useState([]);
    const socket = props.socket;

    const [clientIsHost, setClientIsHost] = useState(false);
    const [flop, setFlop] = useState(tempFlop);
    const [pot, setPot] = useState(0);
    const [clientIsTurn, setClientIsTurn] = useState(false);
    const [currentBet, setCurrentBet] = useState(0);
    const [call, setCall] = useState(null);
    const [gameOn, setGameOn] = useState(false);
    const [clientCards, setClientCards] = useState();
    const [balance, setBalance] = useState();


    useEffect(() => {
        console.log('listeners setup');
        socket.on('players', (players) => {
            let clientId = socket.id
            playersReception(players, clientId);
        });
        socket.on('flop', (cards) => {
            console.log(cards);
            setFlop(cards)
        });
        socket.on('cards-in-hand', (cards) => {
            console.log('cards-in-hand');
            setClientCards(cards);
        });
        socket.on('pot', (serverPot) => {
            console.log(`setting pot @ ${serverPot}`)
            setPot(serverPot)
        })
        socket.on('game-started', () => {
            console.log('game started!');
            setGameOn(true);
        });
        socket.on('casinoCallback', (casino) => {
            console.log(casino);
        });


    }, [])
    useEffect(() => {
        console.log(`tableId from table.js ${props.tableId}`);
        socket.emit('join-socket-room', (props.tableId));
    }, [props.tableId])

    useEffect(() => {
        //console.log(`This is clientName in Table.js ${props.clientName}`);
        //console.log(`This is tableId in Table.js ${props.tableId}`);
    }, [props.clientName, props.tableId]);


    //keep playing order put client in first pos of array
    //call check, setCall
    function playersReception(players, clientId) {
        let clientIndex;
        let highestBet = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id == clientId) {
                clientIndex = i;
                setCurrentBet(players[i].currentBet);
                setBalance(players[i].balance);
                if (players[i].isHost !== clientIsHost) {
                    setClientIsHost(players[i].isHost);
                }
            }
            if (players[i].currentBet > highestBet) {
                highestBet = players[i].currentBet
            }
        }
        if (highestBet > currentBet) {
            setCall(highestBet);
        } else if (highestBet <= currentBet) {
            setCall(null);
        }

        let fromClient = players.slice(clientIndex);
        let toClient = players.slice(0, clientIndex);
        players = fromClient.concat(toClient)
        setPlayers(players);


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
    function callback(id, phase, actualDuration, baseDuration, startTime, comitTime, interactions){
        let object = {
            id: id,
            phase: phase,
            actualDuration: actualDuration,
            baseDuration: baseDuration,
            startTime: startTime,
            comitTime: comitTime,
            interactions: interactions
        };
        //console.log(object);
    }

    return (
        <GlobalHotKeys keyMap={keyMap}>
            <Profiler id='main' onRender={callback}>

            </Profiler>

            <Box className={classes.tableContainer}>

                {props.clientName ? null : <LoginFromUrl
                    submitName={props.submitName}
                    submitTableId={props.submitTableId}
                    socket={socket}></LoginFromUrl>
                }

                <TableContent
                    pot={pot}
                    flop={flop}
                ></TableContent>

                <SideBar
                    socket={socket}
                    tableId={props.tableId}></SideBar>


                <Controls
                    clientIsHost={clientIsHost}
                    gameOn={gameOn}
                    call={call}
                    currentBet={currentBet}
                    balance={balance}
                    tableId={props.tableId}
                    clientIsTurn={clientIsTurn}
                    players={players}
                    socket={props.socket}
                ></Controls>   {/**props= some kind of state for call/check and raise */}

                {players.map((player, i) => {
                    let positions = playerPosition(players.length);
                    if (i === 0) {
                        player.cardsInHand = clientCards
                    }
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
        </GlobalHotKeys>

    )
}

