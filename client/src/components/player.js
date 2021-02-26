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

export default function Player({ playerObject, x, placement }){
    const classes = useStyles();
    const [position, setPosition] = useState();
    const [size, setSize] = useState({height:10, width:10});
    const [xPos, setXPos] = useState(x * W/2);
    const [yPos, setYPos] = useState();
    const [style, setStyle] = useState();
    //console.log(size[1]);
    //console.log(size[2]);

    //top 100
    //y ==100

    

    //if(Math.abs(x) >)

    useEffect(() => {
        setXPos(x);
        let y;
        //let x;
        //console.log('this is useEffect')
        //console.log(xPos);
        console.log(`this is placement ${placement} and this is x ${x} this is xPos ${xPos}`);
       // if (!yPos) {
            //console.log('YPos doesn<t exist yet!');
            //console.log(`table width ${W}`);
            //console.log(`table height ${H}`);
            //console.log(`xPos ${xPos}`);

            let alpha = (W / 2) - (H / 2);
            console.log(`is ${xPos} = xPos || ${x} = x > ${alpha} we should be on curve`);
            if (Math.abs(x * W/2) > alpha) {
                console.log('on curve');
                let r = H / 2;
                let opp = Math.abs(x * W/2) + (H / 2) - (W / 2);
                let sqrt = Math.round(Math.pow(r, 2) - Math.pow(opp, 2));
                //console.log(`this is the sqrt ${sqrt}`);
                y = Math.sqrt(sqrt);
                //console.log('this is y ' + y);
                if(placement < 0){
                    setYPos(-y);
                    console.log(`this is y ${y}`);
                } else {
                    setYPos(y);
                    console.log(`this is y ${y}`);

                }

            } else {
                console.log(`this is h ${H} shit is not on curve`);
                y = H/2;
                setYPos(y);
                console.log(H/2);
                console.log(yPos);
            }
            console.log(`this is ${yPos} done with the placement ${yPos}`);


            setStyle({
                position:'fixed',
                width: size.width,
                height: size.height,
                top: y - size.height/2 + window.innerHeight/2,
                left: x - size.width/2 + window.innerWidth/2,
                zIndex:10000,
            });
       // }
        //setXPos(0.25*window.inner
    }, [x, placement])

    

    
    


    return(
        <Paper
        onClick={console.log('bruh')}
        className={classes.paper}
        style={style}
        ></Paper>
    )

}