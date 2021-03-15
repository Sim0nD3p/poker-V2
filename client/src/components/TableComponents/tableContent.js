import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { settings as tableSettings } from './tableTop';
import { makeStyles } from '@material-ui/core';
import CardContainer from './cardContainer';
import { useSocket } from '../../contexts/SocketProvider';

const useStyles = makeStyles({
    container:{
        width: tableSettings.tableWidth,
        height: tableSettings.tableHeight,
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        left: tableSettings.offsetX + window.innerWidth / 2 - tableSettings.tableWidth / 2,
        top: tableSettings.offsetY + window.innerHeight / 2 - tableSettings.tableHeight / 2,
        zIndex:1000,
    },
    potText: {
        margin:'auto',
        marginBottom:10
    }
})

export default function TableContent(props){
    const classes = useStyles();
    return(
        <Box
            className={classes.container}
        >
            <Typography
                variant='h5'
                className={classes.potText}
            >{props.pot}</Typography>

            <Box
                style={{
                    margin: 'auto',
                    marginTop: 0,
                    display: 'flex'
                }}>
                <CardContainer card={props.flop[0]}></CardContainer>
                <CardContainer card={props.flop[1]}></CardContainer>
                <CardContainer card={props.flop[2]}></CardContainer>
                <CardContainer card={props.flop[3]}></CardContainer>
                <CardContainer card={props.flop[4]}></CardContainer>
            </Box>
        </Box>

    )
}