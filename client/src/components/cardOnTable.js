import React from 'react';
import { Paper, Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Cards from './../res/cards/2C.svg'

const useStyles = makeStyles({
    container:{
        height:100,
        width:71,
        margin:10,
    },
    cardMedia:{
        heihgt:'100%',
        width:'100%',
    }
})


export default function CardContainer(){
    const classes = useStyles();

    console.log(Cards);
    let card;
    return (
        <Card
        className={classes.container}
        >
            <CardMedia
            component='img'
            className={classes.cardMedia}
            src={Cards}
            ></CardMedia>
        </Card>
    )
}