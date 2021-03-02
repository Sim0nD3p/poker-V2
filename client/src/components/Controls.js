import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Button as ButtonMUi, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    container:{
        width:'50%',
        margin:'auto',
        marginRight:10,
        marginBottom:10,
        display:'flex',
        justifyContent:'flex-end',
    },
    button: {
        borderWidth:3,
        margin:10
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
export default function Controls(call, check){
    const classes = useStyles();


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
             <Button text='Fold'></Button>
            <Button text='Raise' action={call}></Button>
            <Button text='Check' action={check}></Button>

        </Grid>


    )
}
