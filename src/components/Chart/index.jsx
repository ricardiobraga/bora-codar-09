import React, { Component, useState } from "react";
import dynamic from 'next/dynamic';
//import ReactApexChart from "react-apexcharts";
import styles from './styles.module.css';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });



export default function Chart(props) {
    const [state, setState] = useState({

        series: [{
            name: "cambio",
            data: [30, 40, 35]
        }],
        options: {
            chart: {
                type: 'area',
                width: 592,                
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },

            title: {
                text: 'Fundamental Analysis of Stocks',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels: [30, 40, 35],
            xaxis: {
                labels: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
                axisTicks: {
                    show: false,
                }
            },
            yaxis: {
                min: 5,
                tickAmount: 4,
                labels: {
                    formatter : (value) => {
                        return value.toFixed(1).replace('.', ',')
                    },
                },                
            },
            fill: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },            
            colors: ["#7C3AED"],
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w}) {
                    return `<div class=tooltip>
                    <span>${String(series[seriesIndex] [dataPointIndex]).replace('.', ',')}</span>
                    <span>${new Date(
                        w.globals.seriesX[seriesIndex][dataPointIndex]
                    ).toLocaleDateString("pt-BR", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                    })}</span>
                    </div>`
                },
            }
        },

    });






    return (
        <>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                width={state.options.chart.width}
                

            />
        </>
    )
}