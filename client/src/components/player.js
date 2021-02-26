import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { tableWidth as W, tableHeight as H } from './graphic/tableTop';
import findPlayerYPos from '../functions/findPlayerYPos';
import findRadialPlayerAngle from '../functions/findRadialPlayerAngle';

const useStyles = makeStyles({
    paper:{
        //width:200,
        //height:200,
        backgroundColor:'red',
        //position:'fixed'
    }
})

export default function Player({ playerObject, x, placement }){
    const classes = useStyles();
    const [position, setPosition] = useState();
    const [size, setSize] = useState({height:10, width:10});
    const [xPos, setXPos] = useState();
    const [yPos, setYPos] = useState();
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
        let posObject = findPlayerYPos(x, placement);
        console.log(findRadialPlayerAngle(x));

        console.log(x, y);
        setYPos(posObject[1]);
        setXPos(posObject[0]);
        
    })
    useEffect(() => {
        console.log(xPos, yPos);
        setStyle({
            position: 'fixed',
            width: size.width,
            height: size.height,
            top: yPos - size.height / 2 + window.innerHeight / 2,
            left: xPos - size.width / 2 + window.innerWidth / 2,
            zIndex: 10000
        })

    }, [xPos, yPos])
    



    return (
        <Paper
        onClick={console.log('bruh')}
        className={classes.paper}
        style={style}
        ></Paper>
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