import React, { Fragment, PureComponent } from 'react';
import {Select} from "antd";
import {FormattedMessage} from "react-intl";
import connect from "react-redux/es/connect/connect";
import { hubRestAPI } from "./../../../../../../config/constants";

const Option = Select.Option;

class SelectSports extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            language        : props.language,
            currentSportName: props.currentSportName != null ? props.currentSportName : "Soccer",
            sports          : []
        };
    }
    
    loadSports = () => {
        fetch(hubRestAPI + 'getSports', {
            method: 'POST',
            body: JSON.stringify({language: this.state.language})
        })
        .then(response => response.json())
        .then(json => {
            this.setState({sports : json.sports.sort()});
        })
    }
    
    componentDidMount() {
        this.loadSports();
        this.props.onChange(this.state.currentSportName);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {}
    
    handleChange = (sportName) => {
        this.setState({currentSportName : sportName})
        this.props.onChange(sportName)
    }
    
    render() {
        const { currentSportName, sports } = this.state;
        return (
            <Select placeholder="Sport" value={currentSportName != null ? currentSportName : undefined} prefixCls="custom-selectbox" onChange={this.handleChange}>
                {sports.length && sports.map((sport, i) =>
                    <Option value={sport} key={i}>
                        <FormattedMessage id={"MainContainer.MatchContents.MainContent.ResultsBoard.FilterBar.Sport." + sport} defaultMessage={sport} />
                    </Option>
                )}
            </Select>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.intl.locale
    }
}

export default connect(mapStateToProps)(SelectSports)