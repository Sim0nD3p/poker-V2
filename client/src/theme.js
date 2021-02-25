import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
    palette: {
        type: 'light',
        common: {
            white: '#ffffff',
            black: '#000000',
        },
        primary: {
            light: '#a7c0cd',
            main: '#78909c',    //rgba(29, 185, 84)
            dark: '#4b636e',


        },
        secondary: {
            light: '#ff6f60',
            main: '#e53935',
            dark: '#ab000d',
        },
        background: {
            //paper: '#121212',
            //default: '#121212'  //rgba(18, 18, 18, 1)
        },
    }
})