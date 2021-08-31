import React, { useState, useEffect } from 'react';
import { Paper, Box, Button, Fab, Zoom } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import { ExpandMoreIcon, ExpandLessIcon  } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    container:{
        display:'flex',
        flexDirection:'column',
        zIndex:1000,
        position:'absolute',
        width:'10%',
        height: '50%',
        backgroundColor: 'green'


    },
    childContainer: {
        display:'flex',
        flexDirection:'column',
    },
    button: {
        //backgroundColor: 'red',
    }
})

//buy in, theme, settings 

export default function SideBar(props){
    const classes = useStyles();
    const socket = props.socket;
    const MORE = 'MORE'; const LESS = 'LESS'

    const [menuActive, setMenuActive] = useState(false)
    const [childActive, setChildActive] = useState([false, false, false, false])
/* 
    useEffect(() => {
        if(menuActive){

        } else setChildActive([false, false, false, false])
        

    }, [menuActive])
 */

    function test(){
        console.log('test')
    }


    const MainIcon = (menuActive) => {
        if(menuActive == false){ return <ExpandMoreIcon/> }
        else if(menuActive == true) { return <ExpandLessIcon/> }
    }

    function ChildButton(key, onClick, text, setChildActive){
        const [active, setActive] = useState(false)
        useEffect(() => {
            if(menuActive){ setActive(true) }
            else { setActive(false) }
        }, [menuActive])
        return (
            <Zoom
            in={active}
            >
                <Fab
                //ddsa
                >{text}</Fab>
            </Zoom>
        )
    }

    return(
        <Box
        className={classes.container}
        >
            <Fab
            className={classes.button}
            onClick={() => {menuActive == true ? setMenuActive(false) : setMenuActive(true)}}
            >{MainIcon(menuActive)}
            </Fab>

            <Box
            className={classes.childContainer}>
                <ChildButton
                    key={0}
                    text='test'
                    onClick={test}
                ></ChildButton>

                <ChildButton
                    key={1}
                    text='test'
                    onClick={test}
                ></ChildButton>

                <ChildButton
                    key={2}
                    text='test'
                    onClick={test}
                ></ChildButton>

                <ChildButton
                    key={3}
                    text='test'
                    onClick={test}
                ></ChildButton>

            </Box>
                    
                    
                    
                    


            

        </Box>
    )
}