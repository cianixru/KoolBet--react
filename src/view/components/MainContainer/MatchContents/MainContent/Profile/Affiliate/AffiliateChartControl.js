import React from "react";
import {Component, Fragment} from 'react';

import "./style.css"
import 'view/datePicker.css';
import {DatePicker, Select} from "antd";
import moment from "moment";

const Option = Select.Option;
const {MonthPicker} = DatePicker;

class AffiliateChartControl extends Component {

    generateYearSelectOptions = () => {
        const end = 2018;
        const start = 1990;
        let options = [];
        for (let i = end; i > start; i--) {
            options.push(<Option key={i} value={i}>{i}</Option>)
        }
        return options;
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        //le.log("AffiliateChartControl updated")
    }*/


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(JSON.stringify(nextProps)===JSON.stringify(this.props) && JSON.stringify(nextState)===JSON.stringify(this.state)){
            return false;
        }else{
            return true
        }
    }
    render() {

        return (
            <Fragment>
                <div className={"affiliate-control__wrapper"}>
                    <div className="profile-period affiliate-control__elements">
                        <div className="inputSection">
                            <MonthPicker
                                className="ProfileDatePicker"
                                placeholder="MONTH"
                                onChange={this.props.setMonth}
                                value=
                                    {
                                        this.props.month !== "" ?
                                            moment(this.props.month, 'YYYY-MM')
                                            :
                                            null
                                    }
                            />
                        </div>
                    </div>

                    <div className="profile-period affiliate-control__elements">
                        <Select
                            placeholder={"YEAR"}
                            prefixCls={"custom-selectbox-affiliate"}
                            onChange={this.props.setYear}
                            value=
                                {
                                    this.props.year !== "" ?
                                        this.props.year
                                        :
                                        undefined
                                }>
                            {this.generateYearSelectOptions()}
                        </Select>
                    </div>

                    <div className="profile-period affiliate-control__elements">
                        <Select
                            placeholder={""}
                            prefixCls={"custom-selectbox-affiliate"}
                            onChange={this.props.updateMultiple}
                            value={this.props.multiple}>
                            <Option key={0} value={0}>{"All"}</Option>
                            <Option key={1} value={1}>{"Single"}</Option>
                            <Option key={2} value={2}>{"x2"}</Option>
                            <Option key={3} value={3}>{"x3"}</Option>
                        </Select>
                    </div>

                </div>
            </Fragment>
        );

    }
}

export default AffiliateChartControl
/*

 */