import React from 'react';
import { connect } from "react-redux";
import { Select } from 'antd';
import './style.css'

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}



class ChangePeriod extends React.Component {

    render() {
        return (
            <div className="change-period__container">
                <Select defaultValue="all_events" prefixCls="custom-selectbox" onChange={handleChange}>
                    <Option value="all_events">All events</Option>
                    <Option value="last_minute">Last minute</Option>
                    <Option value="today">Today</Option>
                    <Option value="tomorrow">Tomorrow</Option>
                </Select>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage
        }
    }
}

export default connect(mapStateToProps)(ChangePeriod)