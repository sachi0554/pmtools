
import React, { Component } from 'react';
import { Pie  } from 'react-chartjs-2';


class PieChart extends Component {
    constructor(props) {
        super(props)

        this.myRef = React.createRef();
        this.state = {
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '# of Bugs',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
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
        const { chartData, chartLabel } = this.props
        let data = this.state.data
        data.datasets[0].data = chartData
        data.labels = chartLabel
        this.setState({ data })
    }

    render() {
        const { data, options } = this.state

        return (
            <Pie ref={this.myRef} data={data} key={Math.random()} options={options} />
        )
    }
}


export default PieChart;