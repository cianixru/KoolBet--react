import React, { Component } from 'react';

import { Radio, DatePicker } from 'antd';

import 'view/datePicker.css';

// const { RangePicker } = DatePicker;

// const FormItem = Form.Item;

class MyTransactionsFilter extends Component {
    state = {
        from: Date.now() - (Date.now() % (1000 * 60 * 60 * 24)),
        to: Date.now(),
        ticketState: 'All',
        period: 'today',

        startValue: null,
        endValue: null,
        endOpen: false,
    }

    componentDidMount() {
        this.props.filter({ ...this.state });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
            this.props.filter({ ...this.state });
        }
    }


    // ED

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChangePeriod = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChangePeriod('startValue', value);
        this.setState(prevState => {
            return {
                ...prevState,
                periodDate: { from: Date.parse(value._d) }
            }
        }, () => {
            if (this.state.period === 'period')
                this.dateChange('period')
        })
    }

    onEndChange = (value) => {
        this.onChangePeriod('endValue', value);
        this.setState(prevState => {
            return {
                ...prevState,
                periodDate: { to: Date.parse(value._d) }
            }
        }, () => {
            if (this.state.period === 'period')
                this.dateChange('period')
        })

    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };

    // END ED


    dateChange = (type) => {
        switch (type) {
            case 'today':
                this.setState(prevState => {
                    return {
                        ...prevState,
                        from: Date.now() - (Date.now() % (1000 * 60 * 60 * 24)),
                        to: Date.now(),
                        period: 'today',
                    }
                });
                break;

            case 'this week':
                this.setState(prevState => {
                    return {
                        ...prevState,
                        from: Date.now() - (1000 * 60 * 60 * 24 * (new Date().getDay() - 1)),
                        to: Date.now(),
                        ticketState: this.state.ticketState,
                        period: 'this week',
                    }
                });
                break;

            case 'this month':
                this.setState(prevState => {
                    return {
                        ...prevState,
                        from: Date.now() - (1000 * 60 * 60 * 24 * (new Date().getDate() - 1)),
                        to: Date.now(),
                        period: 'this month',
                    }
                });
                break;

            case 'period':
                if (this.state.periodDate)
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            ...this.state.periodDate,
                            period: 'period',
                        }
                    });
                else
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            period: 'period',
                        }
                    });
                break;

            default:
                break;
        }
    };


    // periodChange = (period) => {
    //     console.log('startValue :', this.state.startValue);
    //     console.log('endValue :', this.state.endValue);
    //     this.setState(prevState => {
    //         return {
    //             ...prevState,
    //             periodDate: { from: Date.parse(period[0]._d), to: Date.parse(period[1]._d) }
    //         }
    //     }, () => {
    //         if (this.state.period === 'period')
    //             this.dateChange('period')
    //     })
    // }

    ticketStateChange = (ticketState) => {
        this.setState(prevState => {
            return { ...prevState, ticketState: ticketState }
        })
    };

    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div className="bets-filter switch-controls" >
                <div className="cell date">
                    <div className="profile__label">Date</div>

                    <div className="hide-for-medium">
                        <Radio.Group className="mobile-app-toggle" defaultValue="today" buttonStyle="solid" onChange={e => this.dateChange(e.target.value)}>
                            <Radio.Button className="" value="today">TODAY</Radio.Button>
                            <Radio.Button className="" value="this week">THIS WEEK</Radio.Button>
                            <Radio.Button className="" value="this month">THIS MONTH</Radio.Button>
                            <Radio.Button className="" value="period">PERIOD</Radio.Button>
                        </Radio.Group>
                    </div>



                    <div className="hide-for-small">
                        <select className="control-select" name="period" onChange={e => this.dateChange(e.target.value)}>
                            <option value="today">TODAY</option>
                            <option value="this week">THIS WEEK</option>
                            <option value="this month">THIS MONTH</option>
                            <option value="period">PERIOD</option>
                        </select>
                    </div>
                </div>
                <div className="cell period">
                    <div className="profile__label">Period</div>
                    <div className="period-switcher profile-period">
                        <div className="inputSection">
                            {/* <RangePicker onChange={this.periodChange} format="DD/MM/YYYY" id="ticketPeriod" /> */}

                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                format="DD/MM/YYYY"
                                value={startValue}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                className="ProfileDatePicker"
                            />
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                format="DD/MM/YYYY"
                                value={endValue}
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                className="ProfileDatePicker"
                            />
                        </div>

                    </div>
                </div>
                <div className="cell date">
                    <div className="profile__label">Operation type</div>
                    <div className="">
                        <select className="control-select" name="state" onChange={e => this.ticketStateChange(e.target.value)}>
                            <option className="tickets-section" value="">All</option>
                            <option className="tickets-section" value="13">Deposit</option>
                            <option className="tickets-section" value="14">Withdraw</option>
                            <option className="tickets-section" value="34">Stake prematch</option>
                            <option className="tickets-section" value="33">Stake live</option>
                            <option className="tickets-section" value="35">Stake mixed</option>
                            <option className="tickets-section" value="24">Payment note registered</option>
                            <option className="tickets-section" value="25">Payment note paid</option>
                            <option className="tickets-section" value="48">Bonus system withdraw</option>
                            <option className="tickets-section" value="49">Bonus system deposit</option>
                            <option className="tickets-section" value="54">Code Sharing Commission</option>
                            <option className="tickets-section" value="63">Weekly bonus</option>
                            <option className="tickets-section" value="62">Weekly bonus burned</option>
                            <option className="tickets-section" value="55">AFFILIATE COMMISSIONS</option>
                        </select>
                    </div>


                </div>
            </div>
        );
    }
}

export default MyTransactionsFilter;