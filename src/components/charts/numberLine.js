import React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {useThemeContext} from '../../stateManager/ThemeContext';
import * as lightColors from "../../stateManager/lightMode";
import * as darkColors from "../../stateManager/darkMode";

const NumberLine = ({percentage}) => {
    const {theme} = useThemeContext();

    const lineColors = theme === lightColors ? ['#2c3e50', '#e74c3c'] : [darkColors.textMedHeavy, '#e74c3c'];
    const textColor = theme === lineColors ? lightColors.subTextColor : darkColors.subTextColor;

    const data = [
        {
            id: 'line',
            data: [
                {x: 0, y: 0},
                {x: 100, y: 0},
            ],
        },
        {
            id: 'percentage',
            data: [{x: percentage, y: 0}],
        },
    ];

    return (
        <div style={{
            height: '100px',
            width: '100%',
        }}>
            <ResponsiveLine
                data={data}
                margin={{top: 20, right: 30, bottom: 60, left: 30}}
                xScale={{type: 'linear', min: 0, max: 100}}
                yScale={{type: 'linear', min: 0, max: 1}}
                axisBottom={{
                    tickValues: Array.from({length: 21}, (_, i) => i * 5),
                    tickSize: 5,
                    tickPadding: 10,
                    format: (value) => `${value}%`,
                }}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                colors={lineColors}
                lineWidth={3}
                // pointColor={{theme: 'background'}}
                pointBorderWidth={3}
                // pointBorderColor={{from: 'serieColor'}}
                enablePoints={true}
                useMesh={true}
                pointSize={10}
                pointColor={{from: 'color'}}
                pointBorderColor={{from: 'color', modifiers: [['darker', 0.0]]}}
                theme={{
                    tooltip: {
                        container: {
                            display: 'none',
                        },
                    },
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 12,
                                fill: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                                outlineWidth: 0,
                                outlineColor: "transparent"
                            }
                        }
                    },
                }}
            />
        </div>
    );
};

export default NumberLine;
