import React, { Fragment, PureComponent } from 'react';
import {Select} from "antd";
import {FormattedMessage} from "react-intl";
import moment from "moment";

const Option = Select.Option;

const periods = {
    "Today" : {
        countDays: 0,
        label    : "Today"
    },
    "2Days" : {
        countDays: 2,
        label    : "2 Days"
    },
    "3Days" : {
        countDays: 3,
        label    : "3 Days"
    },
    "1Week" : {
        countDays: 7,
        label    : "1 Week"
    },
    "1Month": {
        countDays: 30,
        label    : "1 Month"
    }
};

class SelectPeriods extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            currentPeriod : props.currentPeriod != null ? props.currentPeriod : periods.Today
        };
    }
    
    componentDidMount() {
        if(this.state.currentPeriod != null)
            this.handleChange(this.state.currentPeriod.countDays);
    }
    
    handleChange = (countDays) => {
    
        let periodKey,
            period=null,
            startDate=new Date(),
            endDate=new Date();
    
        periodKey = Object.keys(periods).find(key => periods[key].countDays === countDays);
    
        if(periodKey !== undefined)
            period = periods[periodKey];
        
        startDate.setDate(startDate.getDate() - countDays);
        startDate.setHours(0,0,0,0);
        
        this.props.onChange(period, moment(startDate).format(), moment(endDate).format());
    }
    
    render() {
        const { currentPeriod } = this.state;
        return (
            <Select placeholder="Period" defaultValue={currentPeriod != null ? currentPeriod.countDays : undefined} prefixCls="custom-selectbox" onChange={this.handleChange}>
                {Object.keys(periods).map((key) =>
                    <Option value={periods[key].countDays} key={periods[key].countDays}>
                        <FormattedMessage id={"MainContainer.MatchContents.MainContent.ResultsBoard.FilterBar.Period" + periods[key].label} defaultMessage={periods[key].label} />
                    </Option>
                )}
            </Select>
        );
    }
}

export default SelectPeriods;

export { periods as Periods };