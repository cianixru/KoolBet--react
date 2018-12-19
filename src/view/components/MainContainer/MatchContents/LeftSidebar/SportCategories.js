import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import ChangePeriod from './ChangePeriod';

import { FormattedMessage } from 'react-intl';

const styles = {
    drawerPaper: {
        width: '100%',
        background: '#343649',
        marginTop: 50,
        // marginBottom: 50,
        // height: 'calc(100% - 100px)',
        boxShadow: 'none',
    },
};

const sportsConfig = {
    "1": { "classIcon": "Soccer" },
    "11": { "classIcon": "AmericanFootball" },
    "3": { "classIcon": "Baseball" },
    "2": { "classIcon": "Basketball" },
    "24": { "classIcon": "Darts" },
    "5": { "classIcon": "Tennis" },
    "36": { "classIcon": "Boxing" },
    "4": { "classIcon": "IceHockey" },
    "10": { "classIcon": "Rugby" },
    "13": { "classIcon": "Snooker" },
    "34": { "classIcon": "Volleyball" },
    "9": { "classIcon": "Motorsport" },
    "6": { "classIcon": "Handball" },
    "93": { "classIcon": "Cricket" },
    "38": { "classIcon": "Biathlon" },
    "37": { "classIcon": "SkiJumping" },
    "31": { "classIcon": "AlpineSkiing" },
    "39": { "classIcon": "Cross-Country" }
};

class SportCategories extends PureComponent {

    state = { open: this.props.currentMenuStateOut };


    openMenu = (sport) => {
        this.setState((prevState) => ({
            open:
                (!this.state.open.includes(sport))
                    ? [...prevState.open, sport]
                    : [...prevState.open.filter(i => i !== sport)]
        }));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /* this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
         this.props.dispatch({type: 'CLEAR_TOURNAMENT_ID', payload: tournament})
         this.props.dispatch({type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: tournament})*/
        /* if(this.props.state.tournamentCounter==0) {
             for (let tournament in this.props.state.currentTournamentData) {

                 let toDelete = {tournament: {tournamentId: this.props.state.currentTournamentData[tournament]["tournament"]["tournamentId"]}}
                 this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
                 this.props.dispatch({
                     type: 'CLEAR_TOURNAMENT_ID',
                     payload: this.props.state.currentTournamentData[tournament]["tournament"]["tournamentId"]
                 })
                 this.props.dispatch({
                     type: 'DELETE_TOURNAMENT_SUBSCRIBE',
                     payload: this.props.state.currentTournamentData[tournament]["tournament"]["tournamentId"]
                 })
             }
         }*/
    }

    getTournament = (tournament, subscribe) => {
        if (this.props.state.tournamentCounter["currentTournamentCounter"] === 0) {
            this.props.state.currentTournamentData.forEach((element) => {
                let toDelete = { tournament: { tournamentId: element["tournament"]["tournamentId"] } }
                this.props.dispatch({ type: 'CLEAR_TOURNAMENT_ID' });
                this.props.dispatch({
                    type: 'DELETE_TOURNAMENT_SUBSCRIBE',
                    payload: element["tournament"]["tournamentId"]
                });

                this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
                this.props.dispatch({type: 'TOURNAMENT_COUNTER_SUB'});

            })
        }

        if (this.props.state.currentTournamentData.some(e => e.tournament.tournamentId === tournament)) {

            let toDelete = {tournament: {tournamentId: tournament}}
            this.props.dispatch({type: 'CLEAR_TOURNAMENT_ID'});
            this.props.dispatch({type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: subscribe.tournament});
            this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete});
            this.props.dispatch({type: 'TOURNAMENT_COUNTER_SUB'});
        } else {
            this.props.dispatch({ type: 'TOURNAMENT_COUNTER_ADD' });
            this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: tournament });
            this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });

        }
        this.props.currentMenuState(this.state.open)
    }

    render() {
        const countrySubmenu = (sport) => {
            return <ul className="sport-submenu country__header sport-menu">
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
                        <li className={"is-submenu-item" + (this.state.open.includes(sport.name + '-' + country.name) ? 'opened' : '')}
                            key={index}>
                            <a className="sport-submenu__item icon"
                                onClick={() => this.openMenu(sport.name + '-' + country.name)}>
                                <span className="title" title={country.name}>{country.name}</span>
                                <span className="count">{country.size}</span>
                            </a>
                            {isWidthUp('md', this.props.width) ?
                                <Collapse in={this.state.open.includes(sport.name + '-' + country.name)} timeout="auto"
                                    unmountOnExit>
                                    {sportSubmenu(sport, country)}
                                </Collapse>
                                :
                                <div className="sport-menu">
                                    <Drawer hideBackdrop anchor="right"
                                        open={this.state.open.includes(sport.name + '-' + country.name)}
                                        className="drilldown sport-menu"
                                        classes={{ paper: this.props.classes.drawerPaper }}>
                                        <li className="js-drilldown-back"
                                            onClick={() => this.openMenu(sport.name + '-' + country.name)}><a
                                                tabIndex="0">
                                                <FormattedMessage
                                                    id="MainContainer.MatchContents.LeftSidebar.SportCategories.Back"
                                                    defaultMessage="Back" />
                                            </a></li>
                                        <div className="sub-sub-menu last">{sportSubmenu(sport, country)}</div>
                                    </Drawer>
                                </div>
                            }
                        </li>
                    )
                })}
            </ul>
        }

        const sportSubmenu = (sport, country) => {
            return <ul className="sport-submenu__events-menu">
                {country.tournaments.map((tournament, index) => {
                    let subscribe = {
                        "channel": "sport",
                        "key": "tournament",
                        "date": "More",
                        "sport": sport.id,
                        "country": country.id,
                        "tournament": tournament.id
                    }
                    
                    return (

                        <li key={index} onClick={
                            () => this.getTournament(tournament.id, subscribe)}>
                            <a title={tournament.name}

                               className={"icon " + ((this.props.state.currentTournamentData.some(e => ((e.tournament.tournamentId === tournament.id) && (this.props.state.tournamentCounter.currentTournamentCounter>0)))) ? 'active-tournament' : null)}>

                                <span className="title">{tournament.name}</span>
                                <span className="count">{tournament.size}</span>
                            </a>
                        </li>

                    )
                })}
            </ul>
        }

        return (
            <div className="sport-categories">
                <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                    <div className="sport-menu__title"><FormattedMessage
                        id="MainContainer.MatchContents.LeftSidebar.SportCategories.Caption" defaultMessage="Sports" />
                    </div>
                    <div className="sport-menu__collapse-all"></div>
                </div>

                <ChangePeriod />

                <ul className="sport-menu scroll-watcher">
                    {
                        (this.props.state.sportList.sports) ?
                            this.props.state.sportList.sports.map((sport, index) => {
                                return (
                                    <li key={index} className={this.state.open.includes(sport.name) ? 'opened' : ''}>
                                        <a className="sport-menu__item" onClick={() => this.openMenu(sport.name)}>
                                            <i className={sportsConfig[sport.id] && sportsConfig[sport.id].classIcon}></i>
                                            <span className="title" title={sport.name}>{sport.name}</span>
                                            <span className="count">{sport.size}</span>
                                        </a>
                                        {isWidthUp('md', this.props.width) ?
                                            <Collapse in={this.state.open.includes(sport.name)} timeout="auto"
                                                unmountOnExit>
                                                {countrySubmenu(sport)}
                                            </Collapse>
                                            :
                                            <div className="sport-menu">
                                                <Drawer hideBackdrop anchor="right"
                                                    open={this.state.open.includes(sport.name)}
                                                    className="drilldown sport-menu"
                                                    classes={{ paper: this.props.classes.drawerPaper }}>
                                                    <li className="js-drilldown-back"
                                                        onClick={() => this.openMenu(sport.name)}><a tabIndex="0">
                                                            <FormattedMessage
                                                                id="MainContainer.MatchContents.LeftSidebar.SportCategories.Back"
                                                                defaultMessage="Back" />
                                                        </a></li>

                                                    <div className="sub-sub-menu">{countrySubmenu(sport)}</div>
                                                </Drawer>
                                            </div>
                                        }
                                    </li>
                                )
                            })
                            : null
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            matchCategoriesSelected: state.matchCategoriesSelected,
            sportList: state.sportList,
            activeCategory: state.activeCategory,
            sportId: state.sportId,
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
            tournamentCounter: state.topTournament,
        }
    }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(SportCategories)))