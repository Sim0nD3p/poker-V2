import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, Grid } from '@material-ui/core';
import { useSocket } from '../../contexts/SocketProvider';

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
                color='primary'
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

    useEffect(() => {
        console.log(props);
        console.log(props.gameOn);
        console.log(props.isHost);
    });

    function startGame(){
        socket.emit('start-game', props.tableId)
    }

    function test(){
        console.log('casino from control');
        socket.emit('casino', 'test');
    }
    function call(){
        console.log('call');
    }
    function raise(){
        console.log('raise');
    }
    function check(){
        console.log('check')
    }

    if(socket){

        socket.on('casinoCallback', (casino) => {
            console.log(casino);
        });
    }

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
             {(props.clientIsHost && !props.gameOn) ? <Button text='Start game!' action={startGame}></Button> : null}
            <Button text='Fold'></Button>
            <Button text='Raise' action={raise}></Button>
            <Button text='Check' action={call}></Button>
            <Button text='casino' action={test}></Button>

        </Grid>


    )
}
