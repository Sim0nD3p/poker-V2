import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer, Rect } from 'react-konva';
//import cardBack from '../../res/cardBack.png';
import { Deck } from '../TableComponents/deck';


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

const deck = new Deck();
export default function PlayerHand(props){
    const classes = useStyle()
    const ratio = (2.5 / 3.5);
    //const width = ratio * height;
    const width = ratio*props.height;
    const cardSpacing = 0.21; //* width
    const translation = (width - cardSpacing * width);
    const [cards, setCards] = useState([null, null]);
    
    let angle = 10*Math.PI/180;
    const containerHeight = props.height * Math.cos(angle) + width * Math.sin(angle);
    
    
    let w = width;
    let h = props.height;
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
    let padding = 0.5*(props.height*Math.sin(angle));


    useEffect(() => {
        if(props.cards){
            console.log(cards);
            console.log(deck.card(cards[0]));
            console.log(deck.card(cards[1]));
            setCards(props.cards);

        }

    }, [props.cards])
    
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
                height:props.height,
                width:width,
                transform:'translate(' + translation + 'px, 0px) rotate(-10deg)',
            }}>
                <img
                className={classes.cardMedia}
                src={cards[0] ? deck.card(cards[0]) : deck.back()}
                ></img>
            </Card>

            <Card
            className={classes.card}
            style={{
                height:props.height,
                width:width,
                transform: 'translate(' + 0*translation + 'px, 0px) rotate(10deg)',
            }}>
                <img
                className={classes.cardMedia}
                src={cards[1] ? deck.card(cards[1]) : deck.back()}
                ></img>
            </Card>
        </Box>
    )
}