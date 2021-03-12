import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import { theme } from '../../theme'
import { AddCircleRounded, RemoveCircleRounded } from '@material-ui/icons';
import { Box, Grid, Input, IconButton, OutlinedInput, Button, Paper, Silder, Slider, Typography, InputAdornment, TextField, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: 'auto',
        height: 50,
        //display: 'flex',
        //justifyContent:'flex-end',
        //alignItems:'flex-end',
        margin: 10,
        marginRight: 0,
        //width: 525,
    },
    wrapper:{
    },
    paper:{
        padding:5,
    },
    item: {
        margin: 5
    },
    textField: {
        width: 100,
        height: 50,
    },
    cssLabel: {
        color: `${theme.palette.primary.main}`
    },
    cssOutlinedInput: {
    
        display:'flex',
        alignItem:'center',
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            borderWidth: '3px',
            height: 50,

        }
    },
    inputElement:{
        height:24,
        fontSize:24,
        color: theme.palette.grey[2],
        alignItem:'center',
        paddingLeft:0,
        padding:13,
        margin:'auto'

    },
    cssFocused: {
        borderWidth: '3px'
    },
    notchedOutline: {
        height: 50,
        borderWidth: '3px',
        borderColor: `${theme.palette.primary.main} !important`
    },
    roundContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        padding: 0,
        cursor: 'pointer',
        '&.MuiButtonBase-root': {
            width: 50,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }

        }

    },
    allInButton: {
        height: 50,
        width: 100,
        //backgroundColor: theme.palette.primary.light
    },
    buttonTextColor: {
        color: theme.palette.background.default
    },
    raiseButton: {
        '&.MuiButton-root': {
            color: theme.palette.primary.main,
            height: 50,
            width: 100,
            borderWidth: 3,
            borderColor: theme.palette.primary.main
        }
    },
    icon: {
        '&.MuiIcon-root': {
            height: 30,
            width: 30,
            fontSize: 150,

        },
        color: theme.palette.primary.main

    },
    slider: {
        width: 300,
    }
})
function RoundButton(props) {
    const classes = useStyles();
    return (
        <ButtonBase
            onClick={props.onClick}
            className={classes.roundContainer}
            variant='contained'
        >
            <Typography
                className={classes.buttonTextColor}
                style={theme.typography.button2}
                align='center'>{props.amount}</Typography>
        </ButtonBase>
    )
}

export default function RaiseComponent(props) {
    const classes = useStyles();
    var [targetValue, setTargetValue] = useState(props.currentBet);


    useEffect(() => {
        //props.submitRaise(targetValue);
    }, [targetValue]);
    function raiseSubmit(){
        props.submitRaise(targetValue);
        props.submitDispRaise(false);
    }
    function hideRaiseComp() {
        props.submitDispRaise(false);
    }
    function addCircle(){
        setTargetValue(targetValue + 1);
    }
    function removeCircle(){
        setTargetValue(targetValue - 1);
    }
    function add5(){
        setTargetValue(targetValue + 5);
    }
    function add10(){
        setTargetValue(targetValue + 10);
    }
    function add25(){
        setTargetValue(targetValue + 25);
    }

    function handleRaiseChange(e) {

        setTargetValue(parseFloat(e.target.value));
    }
    function handleSliderChange(e, value){
        console.log(value);
        setTargetValue(value);
    }
    return (
        <Paper
        className={classes.paper}
        elevation={10}>
            <Grid
                container
                direction='column'
                justify='flex-end'
                className={classes.wrapper}
            >
                <Grid item className={classes.container}>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid
                            item
                            className={classes.item}>
                            <TextField
                                className={classes.textField}
                                variant='outlined'
                                label='Raise'
                                value={targetValue}
                                onChange={handleRaiseChange}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    }
                                }}
                                InputProps={{
                                    type:'number',
                                    startAdornment: '$',
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                        input: classes.inputElement
                                    },
                                }}></TextField>
                        </Grid>
                        <Grid item className={classes.item}><RoundButton onClick={add5} amount='+5'></RoundButton></Grid>
                        <Grid item className={classes.item}><RoundButton onClick={add10} amount='+10'></RoundButton></Grid>
                        <Grid item className={classes.item}><RoundButton onClick={add25} amount='+25'></RoundButton></Grid>
                        <Grid item className={classes.item}>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.allInButton}>
                                <Typography className={classes.buttonTextColor} style={theme.typography.button2}>all in</Typography>
                            </Button>
                        </Grid>
                        <Grid item className={classes.item}>
                            <Button
                                variant='outlined'
                                color='primary'
                                className={classes.raiseButton}
                                onClick={hideRaiseComp}>
                                <Typography style={theme.typography.button2}>back</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.container}>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'>

                        <Grid item className={classes.item}>
                            <RemoveCircleRounded onClick={removeCircle} fontSize='large' className={classes.icon}></RemoveCircleRounded>
                        </Grid>
                        <Grid item className={classes.item}>
                            <Slider
                                className={classes.slider}
                                color='primary'
                                onChange={handleSliderChange}
                                value={targetValue}
                                min={(props.call) ? props.call : props.currentBet}
                                max={props.balance}
                                ></Slider>
                        </Grid>

                        <Grid item className={classes.item}>
                            <AddCircleRounded onClick={addCircle}fontSize='large' className={classes.icon}></AddCircleRounded>
                        </Grid>

                        <Grid item className={classes.item}>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={raiseSubmit}
                                className={classes.raiseButton}>
                                <Typography style={theme.typography.button2}>raise</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}