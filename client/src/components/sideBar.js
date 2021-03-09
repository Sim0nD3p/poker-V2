import React, { useState, useEffect } from 'react';
import { Paper, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    container:{
        display:'flex',
        flexDirection:'column',
        zIndex:1000,
        position:'absolute',
        width:'5%',


    }
})

export default function SideBar(props){
    const classes = useStyles();
    const socket = props.socket;

    function casino(){
        socket.emit('casino');
    }
    return(
        <Box
        className={classes.container}>
            <Button onClick={casino}>Casino</Button>
        </Box>
    )
}