import React, { useEffect, useState } from 'react';
import { makeStyles, OutlinedInput } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, ButtonBase, FormControl, InputLabel, Paper, Grid } from '@material-ui/core';
import { useSocket } from '../../contexts/SocketProvider';
import { theme } from '../../theme';
import RaiseComponent from './raiseComponent';
import { GlobalHotKeys } from 'react-hotkeys';
import { keyMap } from'../keyMap';
import ShortcutButton from './shortcutButton';

const useStyles = makeStyles({
    container: {
        maxWidth: 550,
        margin: 'auto',
        marginRight: 0,
        //height:120,
        marginBottom: 0,
        //display:'flex',
        //justifyContent:'flex-end',
        zIndex: 10000,
    },
    paper: {
        paddingRight: 5,
        paddingTop: 10,
        paddingLeft: 5,
    },
    mainButtons: {

    },
    button: {
        borderWidth: 3,
        height: 50,
        minWidth: 100,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        margin: 5,
        '&:hover': {
            borderWidth: 3
        }
    },
    newButton: {
        minWidth: 100,
        height: 50,
        '&.MuiOutlinedInput-root': {

            borderColor: `${theme.palette.primary.main} !important`,
            borderWidth: '3px',
            height: 50,

        },
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            borderWidth: '3px',
            height: 50,

        },


        '&.MuiOutlinedInput-notchedOutline': {
            borderWidth: '3px',
            borderColor: `${theme.palette.primary.main} !important`,
            width: 100,
            height: 50,

        },
        '&.MuiOutlinedInput-input': {
            //color:'red',
            width: 100,
            height: 50,
            fontSize: `${theme.typography.button2.fontSize} !important`,
            fontFamily: theme.typography.button2.fontFamily,
            //textTransform:theme.typography.button2.textTransform,
            letterSpacing: `${theme.typography.button2.letterSpacing}`,
            fontWeight: `${theme.typography.button2.fontWeight}`,
            lineHeight: `${theme.typography.button2.lineHeight}`,
        }

    },
    input: {

    },
    gridItem: {
        width: 110,
        height: 60,
        //margin:5,
        padding: 0,
        dispaly: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})


//keyboard shortcuts
//Client On?
export default function Controls(props) {
    const classes = useStyles();
    const socket = props.socket;
    const [action, setAction] = useState();
    const [raise, setRaise] = useState();
    const [dispRaise, setDispRaise] = useState(false);
    const test = React.useCallback(() => {
        console.log('this is keyboard shortcut test from controls');
    }, []);

    useEffect(() => {
        console.log(props.tableId);

    }, [props.tableId])

    const checkCallShortcut = React.useCallback(() => {
        if(props.call !== null){
            call();
        } else {
            console.log(`check react.callback tableId is ${props.tableId}`);
            check();

        }
    }, [props.tableId, props.call]);
    const foldShortcut = React.useCallback(() => {
        fold();
    }, [props.tableId]);
    const raiseShortcut = React.useCallback(() => {
        setDispRaise(true);
    }, []);


    const handlers = {
        CHECK_CALL: checkCallShortcut,
        FOLD: foldShortcut,
        RAISE: raiseShortcut,
    }
    

    useEffect(() => {
        if (raise) {
            console.log('raising');
            console.log(props.tableId)
            socket.emit('raise', props.tableId, raise);
        }

    }, [raise])

   


    function startGame() {
        socket.emit('start-game', (props.tableId));
    }
    function fold() {
        socket.emit('fold', (props.tableId));
    }
    function check() {
        console.log(`check @ ${props.tableId}`);
        socket.emit('check', (props.tableId));
    }
    function call() {
        socket.emit('call', props.tableId)
    }
    function submitRaise(r) {
        console.log(r);
        setRaise(r);

    }
    function Raise() {
        setDispRaise(true);
        //socket.emit('raise', (props.tableId, raise));
    }

    function casino() {
        socket.emit('casino', `test`);
    }
    function StartGame(props) {
        var element;
        if (props.gameOn == false && props.clientIsHost == true) {
            element =
                //<Grid container>
                <ShortcutButton text='Start game' action={startGame}></ShortcutButton>
            //</Grid> 
        }
        else {
            element = null
        }
        return (element)
    }
    function CheckCall(props) {
        return (
            (props.call === null) ? <ShortcutButton text='Check' action={check}></ShortcutButton> : <ShortcutButton text='Call' action={call}></ShortcutButton>
        )
    }
    
    function MainButtons(props) {
        const classes = useStyles();
        return (
            <GlobalHotKeys handlers={handlers} keyMap={keyMap}>

            
            <Paper
                className={classes.paper}
                elevation={10}>

                <Grid
                    container
                    justify='flex-end'
                    direction='row'
                    className={classes.mainButtons}
                >
                    <StartGame clientIsHost={props.clientIsHost} gameOn={props.gameOn}></StartGame>
                    <ShortcutButton text='Fold' action={fold}></ShortcutButton>
                    <CheckCall call={props.call}></CheckCall>
                    <ShortcutButton text='Raise' action={Raise}></ShortcutButton>
                </Grid>
            </Paper>
            </GlobalHotKeys>

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
                {dispRaise ?
                    <RaiseComponent
                        currentBet={props.currentBet}
                        submitRaise={submitRaise}
                        socket={props.socket}
                        balance={props.balance}
                        call={props.call}
                        currentBet={props.currentBet}
                        submitDispRaise={setDispRaise}
                    ></RaiseComponent>
                    : <MainButtons
                        gameOn={props.gameOn}
                        clientIsHost={props.clientIsHost}
                        call={props.call}
                    ></MainButtons>}



            </Grid>



    )
}
