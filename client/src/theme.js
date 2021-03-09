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
            default: '#E0E0E0', //'rgba(0, 0, 0, 0.85)'  //rgba(18, 18, 18, 1)
        },
        playerObject:{
            inactive: '#383838',//'#262626',
            active: '#121212',
            text: '#ffffff',

        },
        grey:{
            1: '#000000',
            2: '#121212',
            3: '#f35647',
            4: '#383838',
        },
        text: {
            hint:'rgba(0, 0, 0, 0.38)'
        }
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
            fontSize:12,
            fontWeight:400,
        },

    }
})