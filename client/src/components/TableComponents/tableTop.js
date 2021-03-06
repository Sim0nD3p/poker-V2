import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer, Rect } from 'react-konva';
import { theme } from '../../theme';

const aspectRatio = (1920 / 1080);
export const tableWidth = 0.8 * window.innerHeight;
export const tableHeight = 0.4 * window.innerHeight;

export const settings = {
    bgColorStage: theme.palette.background.default,
    tableWidth: tableWidth,
    tableHeight: tableHeight,
    tableColors: [theme.palette.primary.main, theme.palette.primary.dark],
    strokeColor: theme.palette.secondary.main,
    strokeWidth: 10,
    offsetX:0,
    offsetY:0,

}

const useStyles = makeStyles({
    stage:{
        position:'fixed',
        backgroundColor: settings.bgColorStage,
        zIndex:1,
    }
})


export const TableTop = () => {
    const classes = useStyles();
    return (
        <Stage 
        className={classes.stage}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ zIndex:10 }}
        >
            <Layer>
                <Rect
                width={tableWidth}
                height={tableHeight}
                offsetX={settings.offsetX + tableWidth/2}
                offsetY={settings.offsetY + tableHeight/2}
                x={window.innerWidth/2}
                y={window.innerHeight/2}
                cornerRadius={tableHeight/2}
                strokeWidth={settings.strokeWidth}
                stroke={settings.strokeColor}
                fillRadialGradientStartPoint={{
                    x: tableWidth/2,
                    y: tableHeight/2
                }}
                fillRadialGradientStartRadius={0}
                fillRadialGradientEndPoint={{
                    x: tableWidth/2,
                    y: tableHeight/2
                }}
                fillRadialGradientEndRadius={tableWidth}
                fillRadialGradientColorStops={[0, settings.tableColors[0], 1, settings.tableColors[1]]}
                />
            </Layer>
        </Stage>
    )
}