import React, { Fragment, PureComponent } from 'react';
import {Select} from "antd";
import {FormattedMessage} from "react-intl";
import connect from "react-redux/es/connect/connect";
import { hubRestAPI } from "./../../../../../../config/constants";

const Option = Select.Option;

class SelectTournaments extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            language             : props.language,
            currentSportName     : props.currentSportName,
            currentCountryName   : props.currentCountryName,
            currentTournamentName: props.currentTournamentName,
            tournaments          : []
        };
    }
    
    loadTournaments = () => {
        
        if(this.state.currentSportName == null || this.state.currentCountryName == null){
            this.setState({tournaments : []});
            return false;
        }
        
        let params = {
            language : this.state.language,
            sportName: this.state.currentSportName,
            country  : this.state.currentCountryName
        };
        
        fetch(hubRestAPI + 'getTournaments', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(json => {
            this.setState({tournaments : json.tournaments.sort()});
        })
    }
    
    static getDerivedStateFromProps(props, state) {
        // if changed props then clear tournaments
        return {...state, ...props}
    }
    
    componentDidMount() {
        if(this.state.currentSportName != null && this.state.currentCountryName != null)
            this.loadTournaments();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.currentSportName !== prevState.currentSportName || this.state.currentCountryName !== prevState.currentCountryName)
            this.loadTournaments();
    }
    
    handleChange = (tournamentName) => {
        this.setState({currentTournamentName : tournamentName})
        this.props.onChange(tournamentName);
    }
    
    render() {
        const { currentTournamentName, tournaments } = this.state;
        return (
            <Select placeholder="Tournament" value={currentTournamentName != null ? currentTournamentName : undefined} prefixCls="custom-selectbox" onChange={this.handleChange}>
                {tournaments.length && tournaments.map((tournament, i) =>
                    <Option value={tournament} key={tournament}>
                        <FormattedMessage id={"MainContainer.MatchContents.MainContent.ResultsBoard.FilterBar.ChangeTournament." + tournament} defaultMessage={tournament} />
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

export default connect(mapStateToProps)(SelectTournaments)