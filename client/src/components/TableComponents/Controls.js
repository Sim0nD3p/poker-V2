import React, { useEffect, useState } from 'react';
import { makeStyles, OutlinedInput } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, ButtonBase, FormControl, InputLabel, Paper, Grid } from '@material-ui/core';
import { useSocket } from '../../contexts/SocketProvider';
import { theme } from '../../theme';
import RaiseComponent from './raiseComponent';
import { GlobalHotKeys } from 'react-hotkeys';
import { keyMap } from'../keyMap';

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
    newButton2: {
        width: 100,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        margin: 'auto'

    },
    notchedOutline: {
        borderWidth: '3px',
        boderColor: `${theme.palette.primary.main} !important`,

    },
    rootInput: {
        '&.MuiOutlinedInput-input': {
            //color:'red',
            fontFamily: `${theme.typography.button2.fontFamily}`,
            textTransform: `${theme.typography.button2.textTransform}`,
            letterSpacing: `${theme.typography.button2.letterSpacing}`,
            fontWeight: `${theme.typography.button2.fontWeight}`,
            lineHeight: `${theme.typography.button2.lineHeight}`,
            //width:100,
            //height:50,
        },
        //width:100,
        //height:50,
        borderWidth: '3px',
        borderColor: `${theme.palette.primary.main} !important`,
        '&.MuiInput-root': {


        }
    },
    cssOutlinedInput: {
        width: 100,
        height: 50,
        bottom: 0,

        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            alignItem: 'center',
            borderWidth: '3px',


        },

    },
    cssFocused: {
        borderWidth: '3px',
        //width:100,
        //height:50,
    },
    notchedOutline: {
        //width:100,
        //height:50,
        borderWidth: '3px',
        borderColor: `${theme.palette.primary.main} !important`,
        //padding:0,
    },
    inputElement: {
        '&.MuiOutlinedInput-input': {
            color: `${theme.palette.primary.main}`,
            fontSize: theme.typography.button2.fontSize,
            fontFamily: `${theme.typography.button2.fontFamily}`,
            textTransform: `${theme.typography.button2.textTransform}`,
            letterSpacing: `${theme.typography.button2.letterSpacing}`,
            fontWeight: `${theme.typography.button2.fontWeight}`,
            lineHeight: `${theme.typography.button2.lineHeight}`,
        },
    },
    formControl: {
        //height:50,
        //width:100,
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        position: 'relative',
        margin: 'auto',

    },
    inputLabel: {
        //paddingLeft:0,
        position: 'absolute',
        left: 20,
        top: -6,
        color: theme.palette.primary.main,
        fontWeight: theme.typography.button2.fontWeight

    }
})

function Button(props) {
    const classes = useStyles();
    const shortcut = props.text.slice(0, 1);
    function test() {
        console.log('test');
    }
    return (
        <Grid
            item
            className={classes.gridItem}
        >
            <FormControl focused className={classes.formControl}>
                <InputLabel
                    disableAnimation='true'
                    className={classes.inputLabel}
                >{shortcut}</InputLabel>
                <ButtonBase
                    className={classes.newButton2}
                    onClick={props.action}
                >




                    <OutlinedInput
                        classes={{
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            input: classes.inputElement


                        }}
                        type='button'
                        readOnly='true'
                        //placeholder={props.text}
                        notched='true'
                        //labelWidth={18}
                        label='tt'
                        //hiddenLabel={false}
                        inputProps={{
                            defaultValue: props.text,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                                input: classes.inputElement
                            }

                        }}>

                    </OutlinedInput>
                </ButtonBase>
            </FormControl>

            {/* <ButtonMUi       
                size='large'
                variant='outlined'
                onClick={props.action}
                className={classes.button}
            >
                <Typography style={theme.typography.button2}>{props.text}</Typography>
            </ButtonMUi> */}
        </Grid>
    )
}
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
                <Button text='Start game' action={startGame}></Button>
            //</Grid> 
        }
        else {
            element = null
        }
        return (element)
    }
    function CheckCall(props) {
        return (
            (props.call === null) ? <Button text='Check' action={check}></Button> : <Button text='Call' action={call}></Button>
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
                    <Button text='Fold' action={fold}></Button>
                    <CheckCall call={props.call}></CheckCall>
                    <Button text='Raise' action={Raise}></Button>
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
