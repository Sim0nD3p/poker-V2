import React, { useEffect, useState } from 'react';
import { makeStyles, OutlinedInput } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, Grid } from '@material-ui/core';
import { useSocket } from '../../contexts/SocketProvider';
import { theme } from '../../theme';
import RaiseComponent from './raiseComponent';

const useStyles = makeStyles({
    container:{
        maxWidth:550,
        margin:'auto',
        marginRight:10,
        //height:120,
        marginBottom:10,
        //display:'flex',
       //justifyContent:'flex-end',
        zIndex:10000,
    },
    mainButtons:{

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
    function Element(props){
        return(
            <Button
            variant='outlined'
            >{props.text}</Button>
        )
    }
    return (
        <Grid
            item
            className={classes.gridItem}
        >
{/* 
            <OutlinedInput
            className={classes.button}
            //inputComponent={<Button variant='outlined'>{props.text}</Button>}
            readOnly='true'
            notched='true'
            label={props.text}
            value={props.text}></OutlinedInput> */}

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
    const socket = props.socket;
    const [action, setAction] = useState();
    const [raise, setRaise] = useState();
    const [dispRaise, setDispRaise] = useState(false);

    
    function startGame(){
        socket.emit('start-game', (props.tableId));
    }
    function fold(){
        socket.emit('fold', (props.tableId));
    }
    function check(){
        socket.emit('check', (props.tableId));
    }
    function call(){
        socket.emit('call', (props.tableId, props.call))
    }
    function Raise(){
        setDispRaise(true);
        //socket.emit('raise', (props.tableId, raise));
    }
    
    function casino(){
        socket.emit('casino', `test`);
    }
    function StartGame(props){
        var element;
        if(props.gameOn == false && props.clientIsHost == true){
            element =
            //<Grid container>
                <Button text='Start game' action={startGame}></Button>
            //</Grid> 
        }
        else {
            element = null
        }
        return (element)
    }
    function CheckCall(props){
        return(
            (props.call === null) ? <Button text='Check' action={check}></Button> : <Button text='Call' action={call}></Button>
        )
    }
    function MainButtons(props) {
        return (
            <Grid
                container
                justify='flex-end'
                direction='row'
                className={classes.mainButtons}
            >
                <StartGame clientIsHost={props.clientIsHost} gameOn={props.gameOn}></StartGame>
                <CheckCall call={props.call}></CheckCall>
                <Button text='Fold' action={fold}></Button>
                <Button text='Raise' action={Raise}></Button>
            </Grid>

        )

    }
    /* 
            Bet: The first chips placed in the pot on any street.
            Call: To put into the pot an amount of money equal to the most recent bet or raise.
            Check: To not bet, with the option to call or raise later in the betting round
            Raise: To increase the amount of the current bet.

            if(call == null){
                display check
            }
            if(call !== null){
                display call
            }
             */
        
    

    return (
        <Grid
        container
        justify='flex-end'
        alignItems='flex-end'
        direction='row'
        className={classes.container}
        >
            {dispRaise ? <RaiseComponent currentBet={props.currentBet} submitRaise={setRaise}></RaiseComponent>
            : <MainButtons
            gameOn={props.gameOn}
            clientIsHost={props.clientIsHost}
            call={props.call}
            ></MainButtons>}
            

        </Grid>
        

            
    )
}
