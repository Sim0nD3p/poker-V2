import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { settings as tableSettings } from './graphic/tableTop';
import { makeStyles } from '@material-ui/core';
import CardContainer from './cardOnTable';

const useStyles = makeStyles({
    container:{
        width: tableSettings.tableWidth,
        height: tableSettings.tableHeight,
        position:'absolute',
        top: tableSettings.offsetY + window.innerHeight / 2 - tableSettings.tableHeight / 2,
        left: tableSettings.offsetX + window.innerWidth / 2 - tableSettings.tableWidth / 2,
        //backgroundColor:'red',
        zIndex:1000,
        display:'flex'

    }
})

export default function TableContent(cards){
    const classes = useStyles();



    return(
        <Box
        className={classes.container}
        >
            <Box
            style={{
                margin:'auto',
                display:'flex'
            }}
            >
            <CardContainer></CardContainer>
            <CardContainer></CardContainer>
            <CardContainer></CardContainer>
            <CardContainer></CardContainer>
            <CardContainer></CardContainer>


            </Box>

        </Box>

    )
}