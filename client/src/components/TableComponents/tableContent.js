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

export default function TableContent(cards){
    const classes = useStyles();
    const socket = useSocket();

    if(socket){
        
    }
    return(
        <Box
            className={classes.container}
        >
            <Typography
                variant='h5'
                className={classes.potText}
            >POT: 100$</Typography>

            <Box
                style={{
                    margin: 'auto',
                    marginTop: 0,
                    display: 'flex'
                }}>
                <CardContainer></CardContainer>
                <CardContainer></CardContainer>
                <CardContainer></CardContainer>
                <CardContainer></CardContainer>
                <CardContainer></CardContainer>
            </Box>
        </Box>

    )
}