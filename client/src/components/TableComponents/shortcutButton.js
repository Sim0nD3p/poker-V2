import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, ButtonBase, OutlinedInput } from '@material-ui/core';
import { theme } from '../../theme';

const useStyles = makeStyles({
    gridItem: {
        width: 110,
        height: 60,
        padding: 0,
        dispaly: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        position: 'relative',
        margin: 'auto',
    },
    inputLabel: {
        position: 'absolute',
        left: 20,
        top: -6,
        color: theme.palette.primary.main,
        fontWeight: theme.typography.button2.fontWeight

    },
    button: {
        width: 100,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        margin: 'auto'
    },
    cssOutlinedInput: {
        width: 100,
        height: 50,
        bottom: 0,
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            alignItem: 'center',
            borderWidth: '3px',
        },
    },
    cssFocused: {
        borderWidth: '3px',
    },
    notchedOutline: {
        borderWidth: '3px',
        boderColor: `${theme.palette.primary.main} !important`,
    },
    inputElement: {
        '&.MuiOutlinedInput-input': {
            color: `${theme.palette.primary.main}`,
            fontSize: theme.typography.button2.fontSize,
            fontFamily: `${theme.typography.button2.fontFamily}`,
            textTransform: `${theme.typography.button2.textTransform}`,
            letterSpacing: `${theme.typography.button2.letterSpacing}`,
            fontWeight: `${theme.typography.button2.fontWeight}`,
            lineHeight: `${theme.typography.button2.lineHeight}`,
        },
    },
    rootInput: {
        '&.MuiOutlinedInput-input': {
            fontFamily: `${theme.typography.button2.fontFamily}`,
            textTransform: `${theme.typography.button2.textTransform}`,
            letterSpacing: `${theme.typography.button2.letterSpacing}`,
            fontWeight: `${theme.typography.button2.fontWeight}`,
            lineHeight: `${theme.typography.button2.lineHeight}`,
        },
        borderWidth: '3px',
        borderColor: `${theme.palette.primary.main} !important`,
        '&.MuiInput-root': {
        }
    },
})


export default function ShortcutButton(props) {
    const classes = useStyles();
    const shortcut = props.text.slice(0, 1);
    return (
        <Grid
            item
            className={classes.gridItem}
        >
            <FormControl focused className={classes.formControl}>
                <InputLabel
                    disableAnimation='true'
                    className={classes.inputLabel}
                >{shortcut}</InputLabel>
                <ButtonBase
                    className={classes.button}
                    onClick={props.action}
                >
                    <OutlinedInput
                        classes={{
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            input: classes.inputElement
                        }}
                        type='button'
                        readOnly='true'
                        notched='true'
                        label='tt'
                        inputProps={{
                            defaultValue: props.text,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                                input: classes.inputElement
                            }
                        }}>
                    </OutlinedInput>
                </ButtonBase>
            </FormControl>
        </Grid>
    )
}