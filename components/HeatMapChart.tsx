import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, HeatmapChart, ScatterChart } from 'echarts/charts';
import { GridComponent, VisualMapComponent, TooltipComponent, GraphicComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart, SvgChart } from '@wuba/react-native-echarts';

echarts.use([SVGRenderer, LineChart, BarChart, HeatmapChart, VisualMapComponent, GridComponent, TooltipComponent, GraphicComponent, ScatterChart]);

export default function HeatMap() {
    const skiaRef = useRef<any>(null);
    useEffect(() => {

        let xData = [];
        let yData = [];

        const data = [
            [100, 100, 0],
            [80, 170, 15],
            [210, 70, 14],
            [220, 110, 3],
            [105, 150, 0],
            [110, 170, 12],
            [100, 130, 11],
            [90, 120, 10],
            [70, 160, 9],
            [250, 180, 8],
            [280, 190, 7],
            [190, 220, 6],
            [60, 80, 5],
            [30, 30, 4],
            [122, 50, 3],
            [230, 30, 2],
            [250, 70, 0],
        ]

        function generateData(theta, min, max) {
            // let data = [];
            for (let i = 0; i <= 300; i++) {
                // for (let j = 0; j <= 780; j++) {
                //   // let x = (max - min) * i / 200 + min;
                //   // let y = (max - min) * j / 100 + min;
                //   // data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
                //   // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
                // }
                xData.push(i);
            }
            for (let j = 0; j < 225; j++) {
                yData.push(j);
            }
        }
        generateData(2, -5, 5);

        const option = {
            tooltip: {},
            grid: {
                top: 50,
                right: 0,
                left: 40,
                width: 300,
                height: 225,
                backgroundColor: 'rgb(128, 128, 128)'
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'category',
                data: yData
            },
            visualMap: {
                type: 'continuous',
                min: 0,
                max: 15,
                left: 'right',
                top: 'center',
                // calculable: true,
                realtime: false,
                splitNumber: 6,
                inRange: {
                    color: [
                        '#ddeddf',
                        '#e2adb9',
                        '#e88ba0',
                        '#eb6181',
                        '#f7436c',
                        '#f70039',
                    ]
                }
            },
            graphic: {
                elements: [
                    {
                        type: 'image',
                        // left: 'center',
                        // bottom: '10%',
                        style: {
                            image:
                                'https://i.pinimg.com/474x/a4/fc/ed/a4fced78432efaea701c4efa2af93a14.jpg',
                            x: 40,
                            y: 50,
                            width: 300,
                            height: 225
                        }
                    }
                ]
            },
            series: [
                // {
                //   name: 'Gaussian',
                //   type: 'heatmap',
                //   data: [
                //     // dimX   dimY   other dimensions ...
                //     [100, 100, 5],
                //     [4.2, 2.3, 8],
                //     [10.8, 9.5, 12],
                //     [7.2, 8.8, 3]
                //   ]
                //   // emphasis: {
                //   //   itemStyle: {
                //   //     borderColor: '#333',
                //   //     borderWidth: 1
                //   //   }
                //   // }

                //   // progressive: 450,
                //   // animation: true
                // }
                ,
                {
                    name: 'Gaussian',
                    type: 'scatter',
                    symbolSize: 20,
                    blur: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'blue'
                        }
                    },
                    data
                }
            ]
        };

        let chart: any;
        if (skiaRef.current) {
            chart = echarts.init(skiaRef.current, 'light', {
                renderer: 'svg',
                width: 400,
                height: 400,
            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    }, []);

    return (
        <SvgChart ref={skiaRef} />
    )

}