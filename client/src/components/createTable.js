import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Box, Grid, TextField, FormControl, FormGroup, FormControlLabel, Slider, Switch, FormLabel, Radio, RadioGroup, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSocket } from '../contexts/SocketProvider';
import genRandomStr from '../functions/generateRandomString';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    container:{
        width:400,
        margin:'auto',
        marginTop:20,
        padding:25,
        display:'flex',
        flexDirection:'column',
        
    },
    header:{
        margin:'auto',
        marginBottom:10,
        marginTop:10,
    },
    formControl:{
        //margin:'auto',
        marginTop:15,
    },
    sliderBox:{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        marginBottom:15,
    },
    sliderValue:{
        margin:'auto',
        marginLeft:15,
        width:20,
    },
    textField:{
        marginTop:0,
        marginBottom:10,
    }

})


export default function CreateTable({ defaultSettings, submitGameSettings, submitGameId, submitGoToRoom }){
    const classes = useStyles();
    const socket = useSocket();
    const [disableSlider, setDisableSlider] = useState(true);
    const [sliderValue, setSliderValue] = useState(defaultSettings.timer);
    const [gameMode, setGameMode] = useState(defaultSettings.gameMode);
    const tableId = genRandomStr(10);
    const [cashAmount, setCashAmount] = useState(defaultSettings.cashAmount)

    useEffect(() => {
        submitGameId(tableId);
    })
    function handleGameMode(e){
        console.log(e.target.value);
        setGameMode(e.target.value);
    }
    function handleTimerSwitch(e){
        console.log(e.target.checked);
        let bool = e.target.checked;
        if(bool == true){
            setDisableSlider(false);
        } else {
            setDisableSlider(true);
        }
    }
    function defaultSliderValue(){
        if(defaultSettings.timer == null){
            return null
        } else {
            return defaultSettings.timer
        }
    }
    function handleSliderValue(event, value){
        setSliderValue(value);
    }
    function handleCashAmount(event){
        let val = event.target.value;
        if(isNaN(val) == false){
            setCashAmount(parseInt(val));
        }        
    }
    function createGame(){
        let timer;
        if(disableSlider == true){
            timer = null;
        } else {
            timer = sliderValue;
        }
        let gameSettings = {
            gameMode: gameMode,
            timer: timer,
            cashAmount: cashAmount,
        }
        //let str = genRandomStr(10)
        //setTableId(str);
        console.log(tableId);
        console.log(tableId);
        let newGameObject = {
            id: tableId,
            gameSettings: gameSettings
        }
        socket.emit('create-table', newGameObject);
        //socket.emit('game-settings', gameSettings);
        submitGameSettings(gameSettings);
        submitGoToRoom(true);
        //submitGameId(tableId);
    }

    return (
        <Paper
        className={classes.container}
        elevation={5}>
            <Typography className={classes.header} variant='h4'>Table settings</Typography>
            <FormControl className={classes.formControl}>
                <FormLabel>Game mode</FormLabel>
                <RadioGroup
                color='primary'
                defaultValue={defaultSettings.gameMode}
                name='gameMode'
                onChange={handleGameMode}
                >
                    <FormControlLabel value='cash' label='Cash' control={<Radio color='primary'></Radio>}></FormControlLabel>
                    <FormControlLabel value='drink' label='Drink' control={<Radio color='primary'></Radio>}></FormControlLabel>
                </RadioGroup>
            </FormControl>
            <FormControl className={classes.formControl}>

                {/* <FormLabel disabled={gameMode == 'cash' ? false : true}>Balance on start</FormLabel> */}
                <TextField
                    variant='outlined'
                    color='primary'
                    className={classes.textField}
                    disabled={gameMode == 'cash' ? false : true}
                    defaultValue='100'
                    label='cash amount'
                    onChange={handleCashAmount}


                ></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel>Time limit</FormLabel>
                <FormControlLabel
                label='Timer'
                control={
                <Switch onChange={handleTimerSwitch} color='primary'/>
            }
                ></FormControlLabel>
                <Box className={classes.sliderBox}>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderValue}
                        disabled={disableSlider}
                        defaultValue={defaultSliderValue}
                        step={5}
                        min={10}
                        max={120}

                    ></Slider>
                    <Typography
                    className={classes.sliderValue}
                    variant='body1'
                    >{sliderValue}</Typography>
                </Box>
            </FormControl>

            <Link to={`/table?id=${tableId}`}>

                <Button
                    variant='outlined'
                    color='primary'
                    onClick={createGame}>Create game</Button>
            </Link>

        </Paper>
    )
}