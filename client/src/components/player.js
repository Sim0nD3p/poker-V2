import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { tableWidth as W, tableHeight as H } from './graphic/tableTop';
import findPlayerYPos from '../functions/findPlayerYPos';
import findRadialPlayerAngle from '../functions/findRadialPlayerAngle';
import setPlayerMargin from '../functions/setPlayerMargin';

const useStyles = makeStyles({
    paper:{
        //width:200,
        //height:200,
        backgroundColor:'red',
        //position:'fixed'
    },
    playerName:{
        textAlign:'center',
    }
})

export default function Player({ key, player, x, placement }){
    const classes = useStyles();
    const [position, setPosition] = useState();
    const [size, setSize] = useState({height:100, width:300});
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
        zIndex: 10000,

    });
    useEffect(() => {
        setMargin(setPlayerMargin(x, placement));
    }, [x, placement]);

    useEffect(() => {
        if(margin){
            console.log(`this is the margins ${margin[0]}, ${margin[1]}`);
            let posObject = findPlayerYPos(x, placement);
            console.log(`this is positions before spacing x: ${posObject[0]}, y: ${posObject[1]}`);
            setYPos(posObject[1] + margin[1]);
            setXPos(posObject[0] + margin[0]);
        }
    }, [margin])

    useEffect(() => {
        if(isNaN(xPos) == false && isNaN(yPos) == false){
            console.log(`this is positions before style x: ${xPos} y: ${yPos}`);
            setStyle({
                position: 'fixed',
                width: size.width,
                height: size.height,
                top: yPos - size.height / 2 + window.innerHeight / 2,
                left: xPos - size.width / 2 + window.innerWidth / 2,
                zIndex: 10000
            })
        }
    }, [xPos, yPos])
    



    return (
        <Box
        onClick={console.log('bruh')}
        className={classes.paper}
        style={style}
        >
            <Typography
            align='center'
            variant='h4'
            className={classes.playerName}>{player.name}</Typography>
        </Box>
    )
 

    



    /*
                position:'fixed',
                width: size.width,
                height: size.height,
                top: y - size.height/2 + window.innerHeight/2,
                left: x - size.width/2 + window.innerWidth/2,
                zIndex:10000,
    */

    

    
    


   

}