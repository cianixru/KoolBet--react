import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { connect } from "react-redux";
import ChangePeriod from './ChangePeriod';
import { stat } from 'fs';

class SportCategories extends React.Component {
    state = { open: [] };

    handleClick = (sport) => {
        this.setState((prevState) => ({
            open:
                (!this.state.open.includes(sport))
                    ? [...prevState.open, sport]
                    : [...prevState.open.filter(i => i !== sport)]
        }));
    };


    getTournament = (tournament, subscribe) => {
        if (this.props.state.currentTournamentData.some(e => e.tournament.tournamentId == tournament)) {
            let toDelete = {tournament:{tournamentId:tournament}}
            this.props.dispatch({ type: 'CLEAR_TOURNAMENT_ID'});
            this.props.dispatch({ type: 'DELETE_TOURNAMENTS_DATA', payload: toDelete })
            this.props.dispatch({ type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: subscribe.tournament });
            this.props.dispatch({ type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete })    
        }
        else{
            this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: tournament });
            this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });
        }
    }

    render() {
        return (
            <div className="sport-categories">
                <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                    <div className="sport-menu__title">Sports</div>
                    <div className="sport-menu__collapse-all"></div>
                </div>

                <ChangePeriod />

                <ul className="sport-menu scroll-watcher">
                    {
                        (this.props.state.sportList.sports) ?
                            this.props.state.sportList.sports.map((sport, index) => {
                                return (
                                    <li key={index} className={this.state.open.includes(sport.name) ? 'opened' : ''}>
                                        <a className="sport-menu__item" onClick={() => this.handleClick(sport.name)}>
                                            <i className={sport.name.replace(' ', '')}></i>
                                            <span className="title" title={sport.name}>{sport.name}</span>
                                            <span className="count">{sport.size}</span>
                                        </a>
                                        <Collapse in={this.state.open.includes(sport.name)} timeout="auto" unmountOnExit>
                                            <ul className="sport-submenu country__header">
                                                {sport.countries.sort(function (a, b) {
                                                    if (a.name > b.name) {
                                                        return 1
                                                    }
                                                    if (a.name < b.name) {
                                                        return -1;
                                                    }
                                                    return 0;
                                                }).map((country, index) => {
                                                    return (
                                                        <li className={"is-submenu-item " + (this.state.open.includes(sport.name + '-' + country.name) ? 'opened' : '')} key={index} >
                                                            <a className="sport-submenu__item icon" onClick={() => this.handleClick(sport.name + '-' + country.name)}>
                                                                <span className="title" title={country.name}>{country.name}</span>
                                                                <span className="count">{country.size}</span>
                                                            </a>
                                                            <Collapse in={this.state.open.includes(sport.name + '-' + country.name)} timeout="auto" unmountOnExit>
                                                                <ul className="sport-submenu__events-menu">
                                                                    {country.tournaments.map((tournament, index) => {
                                                                        let subscribe = {
                                                                            "channel": "sport",
                                                                            "key": "tournament",
                                                                            "date": "Today",
                                                                            "sport": sport.id,
                                                                            "country": country.id,
                                                                            "tournament": tournament.id
                                                                        }
                                                                        // console.log(tournament.id);
                                                                        return (
                                                                            <li key={index} onClick={() => this.getTournament(tournament.id, subscribe)}>
                                                                                <a className={"icon " + ( (this.props.state.currentTournamentData.some(e => e.tournament.tournamentId == tournament.id)) ? 'active-tournament' : null ) }>
                                                                                    <span className="title">{tournament.name}</span>
                                                                                    <span className="count">{tournament.size}</span>
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </Collapse>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </Collapse>

                                    </li>
                                )
                            })
                            : null
                    }
                </ul>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            matchCategoriesSelected: state.matchCategoriesSelected,
            sportList: state.sportList,
            sportId: state.sportId,
            tournamentId: state.tournamentId,
            subscribeMatch: state.subscribeMatch,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
        }
    }
}

export default connect(mapStateToProps)(SportCategories)