import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocketProvider } from './contexts/SocketProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';


ReactDOM.render(
  //<React.StrictMode>
  <ThemeProvider theme={theme}>

    <App />
  </ThemeProvider>,
  //</React.StrictMode>,
  document.getElementById('root')
);