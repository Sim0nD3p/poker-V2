import React, { useState } from 'react';
import { Box, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer, Rect } from 'react-konva';
import cardBack from './cardBack.png'


const useStyle = makeStyles({
    container: {
        bottom: 0,
        right:0,
        display:'flex',
        padding:0,
        overflow:'visible',
        justifyContent:'flex-end',
        position:'absolute',
        bottom:0,
        right:0,


    },
    cardMedia:{
        height:'100%',
        width:'100%',
    }
})

export default function PlayerHand({ height }){
    const classes = useStyle()
    const ratio = (2.5 / 3.5);
    //const width = ratio * height;
    const width = ratio*height;
    const cardSpacing = 0.21; //* width
    const translation = (width - cardSpacing * width);
    
    let angle = 10*Math.PI/180;
    const containerHeight = height * Math.cos(angle) + width * Math.sin(angle);
    
    
    let w = width;
    let h = height;
    let x = w*Math.sin(angle);
    let rest = x / Math.cos(angle);
    let up = Math.tan(angle*2) * (h-rest);
    let miniVertical = up*Math.sin(angle);
    let miniHorizontal = Math.tan(angle) * miniVertical;
    let manquant = up*Math.cos(angle) - miniHorizontal
    let big = w/Math.cos(angle)
    let totalWidth = big + manquant + 50;
    //console.log(`This is totalWidth ${totalWidth}`);
    //console.log(`this is totalHeight ${containerHeight}`);
    //console.log(`this is width ${width}`);
    let padding = 0.5*(height*Math.sin(angle));


    
    return (
        <Box
        className={classes.container}
        style={{
            height: containerHeight,
            width: totalWidth,
            paddingRight:padding,
        }}
        >
            <Card
            className={classes.card}
            style={{
                height:height,
                width:width,
                transform:'translate(' + translation + 'px, 0px) rotate(-10deg)',
            }}>
                <CardMedia
                className={classes.cardMedia}
                image={cardBack}
                ></CardMedia>
            </Card>

            <Card
            className={classes.card}
            style={{
                height:height,
                width:width,
                transform: 'translate(' + 0*translation + 'px, 0px) rotate(10deg)',
            }}>
                <CardMedia
                className={classes.cardMedia}
                image={cardBack}
                ></CardMedia>
            </Card>
        </Box>
    )
}