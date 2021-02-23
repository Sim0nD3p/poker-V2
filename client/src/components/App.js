import React from 'react'
import { SocketProvider } from '../contexts/SocketProvider';
import Test from './test'
import { Container, Button, Input, TextField, Paper } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { withStyles } from '@material-ui/core';
import { useSocket } from '../contexts/SocketProvider';
import Room from './room';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { addPlayer } from '../redux/actions/actions';

const useStyles = makeStyles({
  container:{
    margin:'auto',
    marginTop:10,
    display:'flex',
    width:500,
    padding:10,
    flexDirection:'column',
  },
  textField:{
    margin:10
  },
  button:{
    margin:10,
  }
})

function CreateId({ submitName, submitId }){
  const classes = useStyles();
  let name;
  function generateIdString() {
    submitName(name);
    submitId(uuidV4()); //random string for id (see uuidV4)
  }
  function textField(e){
    name = e.target.value;
  }
    return (
        <Paper elevation={5} className={classes.container}>
          <TextField
          className={classes.textField}
          onChange={textField}
          variant='outlined'></TextField>
          <Button
          className={classes.button}
          variant='outlined'
          onClick={generateIdString}>Create new Id</Button>
        </Paper>
    )
}


function Content({ id, name }) {
  return (
    <SocketProvider id={id}>
      <Room name={name} id={id}></Room>

    </SocketProvider>
  )
}


function App(){
  const [id, setId] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    console.log(name, id);
    let playerObject = {
      id: id,
      name, name
    }
    if(name){
      store.dispatch(addPlayer(playerObject));
      console.log(store.getState());  
    }
  }, [name, id]);  
  return (
    id ? <Content id={id} name={name}/> : <CreateId submitName={setName} submitId={setId} />
  )
}




export default App;
