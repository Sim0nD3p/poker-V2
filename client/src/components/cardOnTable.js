import React from 'react';
import { Paper, Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Cards from './../res/cards/2C.svg'

export default function CardContainer(){
    const ratio = (2.5 / 3.5);
    const cardHeight = 100;
    const cardWidth = cardHeight * ratio;


    return (
        <img
            style={{
                height: cardHeight,
                width: cardWidth,
                margin: 10,
                borderRadius: 7,
                overflow: 'show'
            }}
            src={Cards}>
        </img>
    )
}
/*
<Card
        className={classes.container}
        style={{
            height: cardHeight,
            width: cardWidth
        }}>
            <CardMedia
            component='img'
            className={classes.cardMedia}
            src={Cards}
            ></CardMedia>
        </Card>

 */