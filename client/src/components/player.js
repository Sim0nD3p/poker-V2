import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { tableWidth as W, tableHeight as H } from './TableComponents/tableTop';
import findPlayerPos from './playerComponents/findPlayerPos';
import findRadialPlayerAngle from './playerComponents/findRadialPlayerAngle';
import setPlayerMargin from './playerComponents/setPlayerMargin';
import { Person } from '@material-ui/icons';
import PlayerHand from './playerComponents/playerHand';
import { theme } from '../theme';


const useStyles = makeStyles({
    container:{
        display:'flex',
        flexDirection:'column',
    },
    paper:{
        height:60,
        backgroundColor:'#cfcfcf',
        display:'flex',
        position:'relative',
        bottom:0,
        width:'100%',
        margin:'auto',
        marginBottom:0,
        color: theme.palette.playerObject.text,
    },
    playerName:{
        textAlign:'center',
        
    },
    card:{
        height:150,
        width:75,
        backgroundColor:'blue',
        zIndex:10000
    },
    person:{
        margin:'auto',
        marginLeft:5,
        marginRight:0,
        fontSize:'48px',
    },
    playerHandContainer:{
        position:'relative',
    },
    betPill:{
        margin:'auto',
        marginBottom:10,
        height:24,
        padding:5,
        paddingLeft:8,
        paddingRight:8,
        backgroundColor: theme.palette.secondary.light,
        borderRadius:1000
    }
})
function CurrentBetPill(props){
    const classes = useStyles();
    return(
        <Box
        className={classes.betPill}
        >
            <Typography
            variant='subtitle2'
            >{props.currentBet}$</Typography>
        </Box>

    )
}

export default function Player(props){
    const classes = useStyles();
    const [position, setPosition] = useState();
    const [size, setSize] = useState({height:50, width:200});
    const [xPos, setXPos] = useState();
    const [yPos, setYPos] = useState();
    const [margin, setMargin] = useState();
    const [playerComponent, setPlayerComponent] = useState();
    var y;
    var theta;
    const [style, setStyle] = useState({
        position: 'fixed',
        width: size.width,
        height: size.height,
        top: yPos - size.height / 2 + window.innerHeight / 2,
        left: xPos - size.width / 2 + window.innerWidth / 2,
    });
    useEffect(() => { setMargin(setPlayerMargin(props.x, props.placement)) }, [props.x, props.placement]);

    useEffect(() => {
        if(margin){
            let posObject = findPlayerPos(props.x, props.placement);
            setYPos(posObject[1] + margin[1]);
            setXPos(posObject[0] + margin[0]);
        }
    }, [margin]);

    useEffect(() => {
        if(isNaN(xPos) == false && isNaN(yPos) == false){
            setStyle({
                position: 'fixed',
                width: size.width,
                height: size.height,
                top: yPos - size.height / 2 + window.innerHeight / 2,
                left: xPos - size.width / 2 + window.innerWidth / 2,
                zIndex: 10000
            })
        }
    }, [xPos, yPos, props.player])
    



    return (
        <Box
            className={classes.container}
            style={style}
        >
            <CurrentBetPill currentBet={props.player.currentBet}></CurrentBetPill>
            <Box
            className={classes.paper}
            style={{
                backgroundColor: props.player.isTurn ? theme.palette.playerObject.active : theme.palette.playerObject.inactive,
            }}>

                <Person
                className={classes.person}
                ></Person>
                <Box>
                    <Typography
                        align='center'
                        variant='h6'
                        className={classes.playerName}
                    >{props.player.name}</Typography>

                    <Typography
                        variant='body2'
                        className={classes.balance}
                    >1200$</Typography>

                </Box>
                    <PlayerHand height={75}></PlayerHand>

            </Box>
            

        </Box>
    ) 

}