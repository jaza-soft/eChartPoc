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
                calculable: true,
                realtime: false,
                splitNumber: 3,
                inRange: {
                    color: ['#ff0005', '#e11216', '#951315']
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
                    data: [
                        // dimX   dimY   other dimensions ...
                        [100, 100, 0],
                        [80, 170, 8],
                        [210, 70, 12],
                        [220, 110, 3]
                    ]
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