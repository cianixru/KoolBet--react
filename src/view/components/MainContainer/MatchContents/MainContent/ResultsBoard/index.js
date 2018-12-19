import React, { Fragment, PureComponent } from 'react';
import FilterBar from './FilterBar';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import withWidth from "@material-ui/core/withWidth";
import {withStyles} from "@material-ui/core/styles";
import { hubRestAPI } from "./../../../../../../config/constants";

class ResultsBoard extends PureComponent {
    
    constructor(props){
        super(props)
        this.state = {
            filter : {
                language             : props.language,
                currentCountryName   : null,
                currentSportName     : null,
                currentTournamentName: null,
                startDate            : null,
                endDate              : null,
            },
            results : {}
        }
    }
    
    onChangeFilter = (filter) => {
        this.setState({filter : {...this.state.filter, ...filter}});
    }
    
    componentDidMount() {
        this.loadObjects();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.filter.startDate !== prevState.filter.startDate
            || this.state.filter.endDate !== prevState.filter.endDate
            || this.state.filter.currentSportName !== prevState.filter.currentSportName
            || this.state.filter.currentCountryName !== prevState.filter.currentCountryName
            || this.state.filter.currentTournamentName !== prevState.filter.currentTournamentName
        )
            this.loadObjects();
    }
    
    loadObjects = () => {
        
        if(this.state.filter.startDate == null || this.state.filter.endDate == null || this.state.filter.currentSportName == null)
            return false;
        
        let params = {
            language  : this.state.filter.language,
            country   : this.state.filter.currentCountryName !== null ? this.state.filter.currentCountryName : "",
            startDate : this.state.filter.startDate,
            endDate   : this.state.filter.endDate,
            sportname : this.state.filter.currentSportName,
            tournament: this.state.filter.currentTournamentName !== null ? this.state.filter.currentTournamentName : ""
        };
        
        fetch(hubRestAPI + 'getObjects', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(json => {
            this.setState({results : json.result});
        })
    }
    
    render() {
        const {results} = this.state;
        return (
            <Fragment>
                <h1 className="sport-header results">Results</h1>
                
                <FilterBar onChange={this.onChangeFilter} />
    
                <div className="results">
                    
                    {Object.keys(results).sort((dateA, dateB) =>{
                        let resultCompare;
                        
                        if(moment(dateA).isBefore(dateB))
                            resultCompare = 1;
                        
                        if(moment(dateA).isAfter(dateB))
                            resultCompare = -1;
                        
                        if(moment(dateA).isSame(dateB))
                            resultCompare = 0;
                        
                        return resultCompare;
                    }).map(date => {
                        const matchesGroups = results[date];
                        return (
                            <div className="result__item" key={date}>
                                <div className="result__group">
                                    <h3 className="date">{date}</h3>
                                    {Object.keys(matchesGroups).sort().map(tournament => {
                                        const matches = matchesGroups[tournament];
                                        return (
                                            <Fragment key={tournament}>
                                                <div className="league">
                                                    <div className="cell">
                                                        <i className="soccer league__icon"></i>
                                                        {tournament}
                                                    </div>
                                                    <div className="cell">
                                                        Result
                                                    </div>
                                                </div>
                                                {matches.sort((matchA, matchB) => {
                                                    let resultCompare;
    
                                                    if(moment(matchA.startDate).isBefore(matchB.startDate))
                                                        resultCompare = -1;
    
                                                    if(moment(matchA.startDate).isAfter(matchB.startDate))
                                                        resultCompare = 1;
    
                                                    if(moment(matchA.startDate).isSame(matchB.startDate))
                                                        resultCompare = 0;
    
                                                    return resultCompare;
                                                }).map((match)=>{
                                                    return(
                                                        <div className="event__row" key={match.matchId}>
                                                            <div className="time">{moment(match.startDate).format("LT")}</div>
                                                            <div className="a">{match.matchTitle}</div>
                                                            <div className="s score">{match.score}</div>
                                                        </div>
                                                    )
                                                })}
                                            </Fragment>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.intl.locale
    }
}

export default connect(mapStateToProps)(ResultsBoard)