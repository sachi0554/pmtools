import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
 
 
class LineChart extends Component {
    constructor(props) {
        super(props)
     
        this.myRef = React.createRef();
        this.state = {
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Story',
                        data: [],
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            }
        }
        
         
    }
   

    componentWillReceiveProps({ chartData, chartLabel }) {
        let data = this.state.data
        data.datasets[0].data = chartData
        data.labels = chartLabel
        this.setState({ data })
    }
  
    componentDidMount() {
        const {chartData, chartLabel }= this.props
        let data = this.state.data
        data.datasets[0].data = chartData
        data.labels = chartLabel
        this.setState({ data })
      }

    render() {
        const { data, options } = this.state
         
        return (
            <Line  ref={this.myRef}  data={data}   key={Math.random()} options={options}    />
        )
    }
}


export default LineChart;