import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSocket } from '../contexts/SocketProvider';
import queryString from 'querystring';

const useStyles = makeStyles({
    container:{
        width:400,
        margin:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        zIndex:5000,
    },
    header:{
        marginTop:10,
    },
    textField:{
        marginTop:10,
        marginBottom:10,
        width:'80%',
    },
    button:{
        marginBottom:20,
        marginTop:5,
        width:'80%'
    }
})

export default function LoginFromUrl(props){
    const classes = useStyles();
    const socket = props.socket;
    const [userStr, setUserStr] = useState();
    const [tableStr, setTableStr] = useState();

    useEffect(() => {
        const parsed = queryString.parse(window.location.search);
        setTableStr(parsed["?id"]);
    }, [userStr])

    function handleUsernameChange(e){
        setUserStr(e.target.value);
    }
    function joinGame(){
        props.submitName(userStr);
        props.submitTableId(tableStr);
        let name = userStr; let tableId = tableStr;
        socket.emit('join-table', ({name, tableId}));
    }
    return (
        <Paper
        elevation={5}
        className={classes.container}
        >
            <Typography
            variant='h5'
            className={classes.header}
            >Enter player name</Typography>

            <TextField
            variant='outlined'
            color='primary'
            label='Username'
            onChange={handleUsernameChange}
            className={classes.textField}
            ></TextField>

            <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={joinGame}
            >Join table!</Button>
        </Paper>
    )
}