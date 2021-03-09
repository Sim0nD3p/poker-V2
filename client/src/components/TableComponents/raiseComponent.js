import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Input, OutlinedInput, Button, Paper, Silder, Slider, Typography, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    container:{
        width:200,
        height:50,
        display:'flex',

    },
    slider:{
        width:150

    },
    input:{
        
      }
})
function EndAdornment(props){
    return(
        <InputAdornment position='end'>
            <Button variant='outlined'>-</Button>
            <Button variant='outlined'>+</Button>
        </InputAdornment>
    )
}

export default function RaiseComponent(props){
    const classes = useStyles();

    return(
        <Grid
        container
        className={classes.container}>
            <Grid
                item>
                <OutlinedInput
                className={classes.input}
                    endAdornment= {<InputAdornment position='end'>
                        <Button variant='outlined'>-</Button>
                        <Button variant='outlined'>+</Button>
                    </InputAdornment>}
                        

                    

                
                ></OutlinedInput>
            </Grid>

            <Grid
                item>
                <Slider
                    className={classes.slider}


                ></Slider>

            </Grid>

            

        </Grid>

    )
}