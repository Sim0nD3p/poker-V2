import React, { useState } from 'react';
import { Paper, Typography, TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import JoinGame from './joinGame';
import NewGame from './newGame';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles({
    container:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    arrowBack:{
        position:'fixed',
        marginTop:10,
        marginLeft:10,
    },
    button:{
        margin:'auto',
        marginBottom:10,
        marginTop:10,
        width:'80%',
    },
    header:{
        margin:'auto',
    }
});

export default function Initial(props){
    const classes = useStyles();
    const [newGame, isNewGame] = useState(false);
    const [joinGame, isJoinGame] = useState(false)

    function gameNew(){
        isNewGame(true);
    };
    function gameJoin(){
        isJoinGame(true);
    };
    function goBack(){
        isNewGame(false);
        isJoinGame(false);
    }
    return (
        <Paper
        elevation={5}
        style={{ width:400, margin:'auto', marginTop:0 }}
        >
            {(!newGame && !joinGame) ? null :
                <ArrowBack onClick={goBack} className={classes.arrowBack}></ArrowBack>
            }
            {(newGame || joinGame) ? null :
                <Box className={classes.container}>
                    <Typography
                        variant='h4'
                        className={classes.header}
                    >Poker app 1.0</Typography>

                    <Button
                        variant='contained'
                        onClick={gameJoin}
                        color='primary'
                        className={classes.button}
                    >Join Game</Button>

                    <Button
                        variant='contained'
                        onClick={gameNew}
                        color='primary'
                        className={classes.button}
                    >Create new game</Button>
                </Box>
            }
            {!joinGame ? null : <JoinGame submitName={props.submitName} submitTableId={props.submitTableId}></JoinGame>}
            {!newGame ? null : <NewGame submitName={props.submitName} submitTableId={props.submitTableId}></NewGame>}

        </Paper>
    )
}