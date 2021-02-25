import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export const tableWidth = 0.5 * window.innerWidth;
export const tableHeight = 0.5 * window.innerHeight;


export const TableTop = () => {
    let offsetX = 0;
    let offsetY = 0;    //75
    return (
        <Stage 

        width={0.80 * window.innerWidth}
        height={0.80 * window.innerHeight}
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
                strokeWidth={20}
                stroke='#a7c0cd'
                fill='#4b636e'/>
            </Layer>
        </Stage>
    )
}