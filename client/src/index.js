import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocketProvider } from './contexts/SocketProvider';

ReactDOM.render(
  //<React.StrictMode>

    <App />,
  //</React.StrictMode>,
  document.getElementById('root')
);