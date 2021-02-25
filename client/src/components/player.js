import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { tableWidth as W, tableHeight as H } from './graphic/table';

const useStyles = makeStyles({
    paper:{
        //width:200,
        //height:200,
        backgroundColor:'red',
        //position:'fixed'
    }
})

export default function Player({ playerObject, x, y }){
    const classes = useStyles();
    const [position, setPosition] = useState();
    const [size, setSize] = useState({height:200, width:200});
    const [xPos, setXPos] = useState(x);
    const [yPos, setYPos] = useState(y); 
    console.log(size[1]);
    console.log(size[2]);

    //top 100
    //y ==100
    function getPosition(x){
        let y;

        if(Math.abs(x) > (W/2 - H/2)){
            y = Math.sqrt((H/2)^2 - (x + H/2 - W/2)^2)
        } else{
            y = (H/2);
        }
        setXPos(x);
        setYPos(y);

        return [x, y]


    }

    useEffect(() => {
        //setXPos(0.25*window.inner
        getPosition(0.3*W)
    })

    

    const style = {
        position:'fixed',
        width: size.width,
        height: size.height,
        top: yPos - size.height/2 + window.innerHeight/2,
        left: xPos - size.width/2 + window.innerWidth/2,
        zIndex:10000,
    }
    


    return(
        <Paper
        className={classes.paper}
        style={style}
        ></Paper>
    )

}