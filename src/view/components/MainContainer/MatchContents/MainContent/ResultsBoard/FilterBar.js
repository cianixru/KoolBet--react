import React, {Component} from 'react';
import SelectSports from './SelectSports';
import SelectCountries from './SelectCountries';
import SelectTournaments from './SelectTournaments';
import SelectPeriods, {Periods} from './SelectPeriods';
import connect from "react-redux/es/connect/connect";

class FilterBar extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            language             : props.language,
            currentSportName     : props.currentSportName,
            currentCountryName   : props.currentCountryName,
            currentTournamentName: props.currentTournamentName,
            currentPeriod        : props.currentPeriod,
            startDate            : null,
            endDate              : null
        };
    }
    
    onChangePeriod = (period, startDate, endDate) =>
    {
        this.setState({
            currentPeriod: period,
            startDate    : startDate,
            endDate      : endDate
        });
    }
    
    onChangeSport = (currentSportName) => {
        this.setState({
            currentSportName     : currentSportName,
            currentCountryName   : null,
            currentTournamentName: null
        });
    }
    
    onChangeCountry = (currentCountryName) => {
        this.setState({
            currentCountryName   : currentCountryName,
            currentTournamentName: null
        });
    }
    
    onChangeTournament = (currentTournamentName) => {
        this.setState({currentTournamentName : currentTournamentName});
    }
    
    componentDidMount() {}
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.startDate !== prevState.startDate
            || this.state.endDate !== prevState.endDate
            || this.state.currentSportName !== prevState.currentSportName
            || this.state.currentCountryName !== prevState.currentCountryName
            || this.state.currentTournamentName !== prevState.currentTournamentName
        )
            this.props.onChange(this.state);
    }
    
    render() {
        const { currentSportName, currentCountryName, currentTournamentName } = this.state;
        return (
            <div className="filter__wrapper">
                <div className="filter__container resuts-filter">
                    <div className="cell">
                        <SelectPeriods  onChange={this.onChangePeriod} />
                    </div>
                    <div className="cell">
                        <SelectSports onChange={this.onChangeSport} />
                    </div>
                    <div className="cell">
                        <SelectCountries onChange={this.onChangeCountry} currentSportName={currentSportName} currentCountryName={currentCountryName} />
                    </div>
                    <div className="cell">
                        <SelectTournaments onChange={this.onChangeTournament} currentSportName={currentSportName} currentCountryName={currentCountryName} currentTournamentName={currentTournamentName} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        language: state.intl.locale
    }
}

export default connect(mapStateToProps)(FilterBar)