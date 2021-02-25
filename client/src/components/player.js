import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { tableWidth as W, tableHeight as H } from './graphic/tableTop';

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
    const [size, setSize] = useState({height:10, width:10});
    const [xPos, setXPos] = useState(x * W/2);
    const [yPos, setYPos] = useState(); 
    //console.log(size[1]);
    //console.log(size[2]);

    //top 100
    //y ==100
    

    //if(Math.abs(x) >)

    useEffect(() => {
        console.log(xPos);
        if (!yPos) {
            console.log('YPos doesn<t exist yet!');
            console.log(`table width ${W}`);
            console.log(`table height ${H}`);
            console.log(`xPos ${xPos}`);

            let alpha = (W / 2) - (H / 2);
            if (Math.abs(xPos) > alpha) {
                let r = H / 2;
                let opp = Math.abs(xPos) + (H / 2) - (W / 2);
                let sqrt = Math.round(Math.pow(r, 2) - Math.pow(opp, 2));
                console.log(`this is the sqrt ${sqrt}`);
                let yLocal = Math.sqrt(sqrt);
                console.log('this is y ' + yLocal);
                setYPos(yLocal);

            } else {
                setYPos(H/2);
            }
        }
        //setXPos(0.25*window.inner
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
        onClick={console.log('bruh')}
        className={classes.paper}
        style={style}
        ></Paper>
    )

}