import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Input, Paper, Silder, Slider, Typography, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles({
    container:{
        width:200,
        height:50,
        display:'flex',

    },
    slider:{
        width:150

    },
    label:{

    }
})
function EndAdornment(props){
    return(
        <Button>test</Button>
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
                <Input
                className={classes.label}
                endAdornment={EndAdornment}
                inputProps={{
                    type:'number'
                }}
                ></Input>
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