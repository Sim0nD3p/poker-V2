import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer, Rect } from 'react-konva';

export const tableWidth = 0.45 * window.innerWidth;
export const tableHeight = 0.3 * window.innerHeight;

const useStyles = makeStyles({
    stage:{
        position:'fixed'
    }
})


export const Card = () => {
    return (
        <Stage 
        className={classes.stage}

        width={window.innerWidth}
        height={window.innerHeight}
        >
            <Layer>
                <Rect
                width={tableWidth}
                height={tableHeight}
                offsetX={offsetX + tableWidth/2}
                offsetY={offsetY + tableHeight/2}
                x={window.innerWidth/2}
                y={window.innerHeight/2}
                cornerRadius={tableHeight/2}
                strokeWidth={15}
                stroke='#a7c0cd'
                fill='#4b636e'/>
            </Layer>
        </Stage>
    )
}