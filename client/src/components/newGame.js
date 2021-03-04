import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, TextField, Slider, Button, Switch, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import genRandomStr from '../functions/generateRandomString';
import { useSocket } from '../contexts/SocketProvider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
    },
    header:{
        margin:'auto',
        marginTop:10,
        marginBottom:10,
    },
    bodyText:{
        margin:'auto',
        marginTop:0,
        marginBottom:10,
    },
    formControl:{
        margin:30,
        marginBottom:5,
        marginTop:5,
    },
    textField:{
        marginTop:10,
        marginBottom:10,
        //width:300,
    },
    sliderBox:{
        display:'flex',
        margin:0,
        marginBottom:10,
    },
    slider:{
        marginLeft:0,
        marginRight:30,
    },
    sliderValue:{
        width:30,
    },
    button:{
        margin:30,
    }
})

const defaultSettings = {
    gameMode: 'cash',
    timerDisabled: true,
    timer: null,  
    smallBlind: 1,
    buyIn: 100,
}

//finir gameSetting implementation with defaultGameSettings and emit(game-settings) to server

export default function NewGame(props){
    const classes = useStyles();
    const socket = useSocket();
    const [gameMode, setGameMode] = useState(defaultSettings.gameMode);
    const [ timerDisabled, setTimerDisabled] = useState(defaultSettings.timerDisabled);
    const [timerTime, setTimerTime] = useState(60);
    const [buyIn, setBuyIn] = useState(defaultSettings.buyIn);
    const [smallBlind, setSmallBlind] = useState(defaultSettings.smallBlind)
    const [userStr, setUserStr] = useState();
    const randomStr = genRandomStr(10);

    function handleUsernameChange(e){
        setUserStr(e.target.value);
    }
    function handleGameModeChange(e){
        setGameMode(e.target.value)
    }
    function handleBuyInChange(e){
        setBuyIn(parseInt(e.target.value));
    }
    function handleTimerToggleChange(e){
        if(e.target.checked === true){
            setTimerDisabled(false);
        } else if(e.target.checked === false){
            setTimerDisabled(true);
            setTimerTime(null)
        }
    }
    function handleTimerChange(event, value){
        setTimerTime(parseInt(value));
    }
    function handleSmallBlindChange(e){
        setSmallBlind(parseInt(e.target.value));
    }
    function createGame(){
        if(userStr){

            props.submitTableId(randomStr);
            props.submitName(userStr);
            let name = userStr; let tableId = randomStr;
            let timer;
            if(timerDisabled == true){
                timer = null;
            } else {
                timer = timerTime;
                
            }
            let gameSettings = {
                gameMode: gameMode,
                timerDisabled: timerDisabled,
                timer: timer,
                buyIn: buyIn,
                smallBlind: smallBlind,
            }
            socket.emit('create-table', name, tableId, gameSettings);
            socket.emit(`game-settings`, gameSettings);
        }
    };
    return (
        <Paper
        elevation={5}
        className={classes.container}
        >
            <Typography
            variant='h5'
            className={classes.header}
            >Create table</Typography>

            <Typography
            variant='body1'
            className={classes.bodyText}
            >Enter your table settings</Typography>

            <FormControl className={classes.formControl}>
                <TextField
                    variant='outlined'
                    color='primary'
                    className={classes.textField}
                    label='Username'
                    onChange={handleUsernameChange}
                    fullWidth='true'
                ></TextField>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel>Game mode</FormLabel>
                <RadioGroup
                    color='primary'
                    defaultValue={defaultSettings.gameMode}
                    name='gameMode'
                    onChange={handleGameModeChange}
                >
                    <FormControlLabel value='cash' label='Cash' control={<Radio color='primary'></Radio>}></FormControlLabel>
                    <FormControlLabel value='drink' label='Drink' control={<Radio color='primary'></Radio>}></FormControlLabel>
                </RadioGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    variant='outlined'
                    color='primary'
                    className={classes.textField}
                    disabled={gameMode == 'cash' ? false : true}
                    defaultValue='100'
                    label='Buy in'
                    onChange={handleBuyInChange}
                    fullWidth='true'
                ></TextField>
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    variant='outlined'
                    color='primary'
                    className={classes.textField}
                    label='Small blind'
                    onChange={handleSmallBlindChange}
                    fullWidth='true'
                ></TextField>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel>Time limit</FormLabel>
                <FormControlLabel
                    label='Timer'
                    control={
                        <Switch onChange={handleTimerToggleChange} color='primary' />
                    }
                ></FormControlLabel>
                <Box className={classes.sliderBox}>
                    <Slider
                        className={classes.slider}
                        value={timerTime}
                        onChange={handleTimerChange}
                        disabled={timerDisabled}
                        defaultValue={timerTime}
                        step={5}
                        min={10}
                        max={120}
                    ></Slider>
                    <Typography
                    className={classes.sliderValue}
                    variant='body1'
                    >{timerDisabled ? 'infinite' : timerTime}</Typography>
                </Box>
            </FormControl>

            <Link to={`/table?id=${randomStr}`} onClick={e => (!userStr) ? e.preventDefault() : null}>
                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={createGame}
                >Create game</Button>
            </Link>
        </Paper>
    )
}