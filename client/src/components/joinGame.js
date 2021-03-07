import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';

const useStyles = makeStyles({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    header:{
        marginTop:10,
        marginBottom:10,
    },
    bodyText:{
        marginBottom:10
    },
    textField:{
        width:'80%',
        marginBottom:5,
    },
    button:{
        width:'80%',
        margin:5,
        marginBottom:15,
    }
}) 

export default function JoinGame(props){
    const classes = useStyles();
    const [tableStr, setTableStr] = useState();
    const [userStr, setUserStr] = useState();
    const socket = props.socket;

    function handleNameChange(e){
        console.log(e.target.value);
        setUserStr(e.target.value);
    }
    function handleTableIdChange(e){
        console.log(e.target.value);
        setTableStr(e.target.value);
    }
    function joinGame(){
        if(userStr && tableStr){
            props.submitName(userStr);
            props.submitTableId(tableStr);
            let name = userStr; let tableId = tableStr;
            socket.emit('join-table', ({name, tableId}));
        }
    }

    return (
        <Paper
        elevation={5}
        className={classes.container}
        >
            <Typography
                variant='h5'
                className={classes.header}
            >Join table</Typography>

            <Typography
                variant='body1'
                className={classes.bodyText}
            >Enter username ans table ID to join the game</Typography>

            <TextField
                variant='outlined'
                color='primary'
                label='Name'
                onChange={handleNameChange}
                className={classes.textField}
            ></TextField>

            <TextField
                variant='outlined'
                color='primary'
                label='Table ID'
                onChange={handleTableIdChange}
                className={classes.textField}
            ></TextField>

            <Link to={`/table?id=${tableStr}`} onClick={e => (!userStr || !tableStr) ? e.preventDefault() : null}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={joinGame}
                    className={classes.button}
                >Join table!</Button>
            </Link>
        </Paper>
    )
}