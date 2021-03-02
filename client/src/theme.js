import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
    palette: {
        
        common: {
            white: '#ffffff',
            black: '#000000',
        },
        primary: {
            light: '#38732d',
            main: '#004701',    //rgba(29, 185, 84)
            dark: '#002100',


        },
        secondary: {
            light: '#f35647',
            main: '#BA1D1E',
            dark: '#820000',
        },
        background: {
            paper: '#ffffff',
            default: 'rgba(0, 0, 0, 0.85)'  //rgba(18, 18, 18, 1)
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