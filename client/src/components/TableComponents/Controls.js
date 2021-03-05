import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, Grid } from '@material-ui/core';
import { useSocket } from '../../contexts/SocketProvider';
import { theme } from '../../theme';

const useStyles = makeStyles({
    container:{
        width:'50%',
        margin:'auto',
        marginRight:10,
        marginBottom:10,
        display:'flex',
        justifyContent:'flex-end',
        zIndex:10000,
    },
    button: {
        borderWidth:3,
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
        margin:10,
        '&:hover':{
            borderWidth:3
        }
    }
})

function Button(props) {
    const classes = useStyles();
    return (
        <Grid
            item
            className={classes.gridItem}
        >
            <ButtonMUi
                
                size='large'
                variant='outlined'
                onClick={props.action}
                className={classes.button}
            >{props.text}</ButtonMUi>
        </Grid>
    )
}
//keyboard shortcuts
//Client On?
export default function Controls(props){
    const classes = useStyles();
    const socket = useSocket();
    const [action, setAction] = useState();

    useEffect(() => {
        console.log(action);
    }, [action]);

    useEffect(() => {
        console.log('client turn');
        if(props.clientIsTurn === true){
            if(action === 'call'){
                socket.emit('call', props.tableId);
            }
            else if(action === 'raise'){
                socket.emit('raise', props.tableId, 50);
            }
            else if(action === 'check'){
                socket.emit('check', props.tableId)
            }
            else if(action === 'fold'){
                socket.emit('fold', props.tableId)
            }
        }
    }, [props.clientIsTurn])

    function startGame(){
        if(props.players.length >= 2){
            let tableId = props.tableId;
            socket.emit('start-game', (tableId));
        }
    }

    function test(){
        console.log('casino from control');
        socket.emit('casino', 'test');
    }

    function call(){
        if(action === 'call'){
            setAction(null);
        } else {
            setAction('call') };
        }
    function raise(){ setAction('raise') };
    function fold(){ setAction('fold') };
    function check(){ setAction('check') };

    if(socket){

        socket.on('casinoCallback', (casino) => {
            console.log(casino);
        });
    }
    console.log(props.clientIsHost);

    return (
        <Grid
        container
        className={classes.container}
        >

            {/* 
            Bet: The first chips placed in the pot on any street.
            Call: To put into the pot an amount of money equal to the most recent bet or raise.
            Raise: To increase the amount of the current bet.
            Check: To not bet, with the option to call or raise later in the betting round
             */}
             {(!props.clientIsHost && !props.gameOn) ? null : <Button text='Start game' action={startGame}></Button>}
            {(props.call === null) ? <Button text='Check' action={check}></Button> :
                <Button text='call' action={call(props.call)}></Button>}
                
            <Button text='casino' action={test}></Button>
            <Button text='Fold' action={fold}></Button>
            <Button text='Raise' action={raise}></Button>

        </Grid>


    )
}
