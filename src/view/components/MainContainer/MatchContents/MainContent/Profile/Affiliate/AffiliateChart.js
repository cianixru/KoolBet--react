import React from "react";
import {Component, Fragment} from 'react';
import "./style.css"

import {Line} from 'react-chartjs-2';
import Moment from 'moment'


class AffiliateChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            labels: []
        };
    }

    componentDidMount() {
        this.prepareData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("AffiliateChart updated")
        this.prepareData()
    }

    prepareData = () => {

        if (Array.isArray(this.props.data) && this.props.data.length > 0) {

            let months = this.props.data[0].day === null ? Moment.months() : [];
            let plotData = [];
            let plotLabels = [];
            this.props.data.forEach((e) => {

                plotLabels.push(e.day === null ? months[e.month - 1] : e.day);
                plotData.push(this.prepareY(e.commissions.commission))


            })
            //console.log("Plot data", plotData)
            this.setState({data: plotData, labels: plotLabels})
        }

    }

    prepareY = (obj) => {

        let sum = 0;
        if (Array.isArray(obj)) {
            obj.forEach((e) => {
                if (e.type === this.props.multiple && this.props.multiple !== 0)
                    sum = sum + parseFloat(e.sum);
                if (this.props.multiple === 0)
                    sum = sum + parseFloat(e.sum);
            })
        }
        return sum;
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false;
        } else {
            return true
        }
    }

    render() {

        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: '#ffbf00',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#ffbf00',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ffbf00',
                    pointHoverBorderColor: '#ffbf00',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: this.state.data,
                }
            ],
        };

        return (

            <Fragment>
                <Line
                    onElementsClick={(e) => this.props.getPointDataOnClick(e)}

                    data={data}
                    height={300}
                    options={{
                        tooltips: {
                            enabled: false,
                        },
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    fontColor: "white",
                                    suggestedMin: 0,
                                    suggestedMax: Math.max(...this.state.data) + 0.1,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: this.props.currency,
                                    fontColor: "white",
                                }
                            }],
                            xAxes: [{
                                display: true,
                                ticks: {
                                    display: true,
                                    fontColor: "white",
                                    suggestedMin: 0,
                                },
                                scaleLabel: {
                                    display: true,
                                }
                            },
                            ],
                        },

                    }}
                />
            </Fragment>
        );

    }
}

export default AffiliateChart
