import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import { theme } from '../../theme'
import { AddCircleRounded, RemoveCircleRounded } from '@material-ui/icons';
import { Box, Grid, Input, OutlinedInput, Button, Paper, Silder, Slider, Typography, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: 200,
        height: 50,
        display: 'flex',

    },
    slider: {
        width: 150

    },
    textField: {
        border: 10,
        '& .MuiTextField-root': {
            border: '3px solid green',
            borderColor: 'red',
        }

    },
    border: {
        color: 'green'

    },
    textField: {
        width: 125


    },
    cssLabel: {
        //color : `${theme.palette.primary.light}`
    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.light} !important`,
            borderWidth: '3px'
        }
    },

    cssFocused: {
        borderWidth: '3px'
    },

    notchedOutline: {
        borderWidth: '3px',
        borderColor: `${theme.palette.primary.light} !important`
    },
    icons: {
        color: theme.palette.text.hint
    },
})

export default function RaiseComponent(props) {
    const classes = useStyles();
    var [targetValue, setTargetValue] = useState(props.currentBet);


    useEffect(() => {
        props.submitRaise(targetValue);
    }, [targetValue]);

    function addToRaise(){
        let i = parseFloat(targetValue) + 1;
        setTargetValue(i);

    }
    function subToRaise(){
        let i = parseFloat(targetValue) - 1;
        setTargetValue(i);
    }
    function handleRaiseChange(e){
        setTargetValue(e.target.value);
        console.log(e.target.value);
    }
    return (
        <Grid
            container
            className={classes.container}>
            <Box
                style={{
                    display: 'flex'
                }}>
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
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        type: 'numeric',
                        endAdornment: <InputAdornment position='end'>
                            <AddCircleRounded onClick={addToRaise} className={classes.icons}></AddCircleRounded>
                            <RemoveCircleRounded onClick={subToRaise} className={classes.icons}></RemoveCircleRounded>
                        </InputAdornment>,

                    }}
                ></TextField>
            </Box>
        </Grid>

    )
}