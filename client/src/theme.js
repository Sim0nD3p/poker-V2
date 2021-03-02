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
    },
    typography: {
        h1: {

        },
        h2: {

        },
        h3: {

        },
        h4: {

        },
        h5: {

        },
        h6: {

        },
        body1: {

        },
        body2:{

        },
        subtitle1: {
            fontFamily: 'Roboto',
            fontWeight:500,
            fontSize:16

        },
        subtitle2: {
        },

    }
})