import React, { Fragment, PureComponent } from 'react';
import {Select} from "antd";
import {FormattedMessage} from "react-intl";
import connect from "react-redux/es/connect/connect";
import { hubRestAPI } from "./../../../../../../config/constants";

const Option = Select.Option;

class SelectCountries extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            language          : props.language,
            currentSportName  : props.currentSportName,
            currentCountryName: props.currentCountryName,
            countries         : []
        };
    }
    
    loadCountries = () => {
        
        if(this.state.currentSportName == null){
            this.setState({countries:[]});
            return false;
        }
        
        const params = {
            language: this.state.language,
            sportName: this.state.currentSportName
        };
        
        fetch(hubRestAPI + 'getCountries', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(json => {
            this.setState({countries : json.countries.sort()});
        })
    }
    
    static getDerivedStateFromProps(props, state) {
        return {...state, ...props }
    }
    
    componentDidMount() {
        if(this.state.currentSportName != null)
            this.loadCountries();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.currentSportName !== prevState.currentSportName)
            this.loadCountries();
    }
    
    handleChange = (countryName) => {
        this.setState({currentCountryName : countryName})
        this.props.onChange(countryName);
    }
    
    render() {
        const { currentCountryName, countries } = this.state;
        return (
            <Select placeholder="Country" value={currentCountryName != null ? currentCountryName : undefined} prefixCls="custom-selectbox" onChange={this.handleChange}>
                {countries.length && countries.map((country, i) =>
                    <Option value={country} key={country}>
                        <FormattedMessage id={"MainContainer.MatchContents.MainContent.ResultsBoard.FilterBar.Country." + country} defaultMessage={country} />
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

export default connect(mapStateToProps)(SelectCountries)