import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Select } from 'antd';
import './style.css'

import messages from './messages.lang';
import { FormattedMessage } from 'react-intl';

const Option = Select.Option;

class ChangePeriod extends PureComponent {


    handleChange = (value) => {
        // console.log(`selected ${value}`);
        this.props.dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: value })
    }


    render() {
        return (
            <div className="change-period__container">
                <Select defaultValue="Today" value={this.props.state.activeCategory} prefixCls="custom-selectbox" onChange={this.handleChange}>
                <Option value="Today"><FormattedMessage {...messages.Today} /></Option>
                <Option value="SixHours"><FormattedMessage {...messages.SixHours} /></Option>
                <Option value="Tomorrow"><FormattedMessage {...messages.Tomorrow} /></Option>
                <Option value="More"><FormattedMessage {...messages.More} /></Option>
                </Select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            activeCategory: state.activeCategory,
        }
    }
}

export default connect(mapStateToProps)(ChangePeriod)