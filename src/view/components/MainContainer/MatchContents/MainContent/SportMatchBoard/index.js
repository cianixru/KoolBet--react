import React, { Fragment } from 'react';
import { connect } from "react-redux";

import CategoriesFilter from './CategoriesFilter';
import MatchData from './MatchData';

import Asian from './Templates/Asian';
import Bmg1hCs from './Templates/Bmg1hCs';
import BmgCorrectScore from './Templates/BmgCorrectScore';
import BmgOutright from './Templates/BmgOutright';
import TopTournaments from './TopTournament/TopTournaments'

import {isWidthUp} from "@material-ui/core/withWidth";
import withWidth from "@material-ui/core/withWidth/withWidth";

class SportMatchBoard extends React.PureComponent {

    state = { marketGroups: {}, selectedMarkets: {} }

    componentDidMount() {
        this.props.state.currentTournamentData.map((e, index) => {
            if (!e.tournament.value.some(item => Date.parse(item.expiryDate) > Date.now())) {
                this.props.dispatch({ type: 'TOURNAMENT_COUNTER_SUB' });
                this.props.dispatch({ type: 'DELETE_TOURNAMENTS_DATA', payload: e.tournament.tournamentId });
                this.props.dispatch({ type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: e.tournament.tournamentId });
                this.props.dispatch({
                    type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA',
                    payload: { tournament: { tournamentId: e.tournament.tournamentId } }
                })
                this.props.dispatch({ type: 'DELETE_TOURNAMENT_ODDS', payload: e.tournament.tournamentId });
            }
        })
    }

    static getDerivedStateFromProps(props, state) {

        let mGroup = {};
        if (Array.isArray(props.state.currentTournamentData)) {
            props.state.currentTournamentData.map((e, index) => {
                let sortGroup = {};
                e.tournament.value.map(tournament => {
                    tournament.groups.map(group => {
                        sortGroup[group.sort] = { id: group.id, txt: group.txt, txts: group.txts }
                    });
                })
                mGroup[index] = Object.values(sortGroup)
            })
        }

        if (JSON.stringify(state.marketGroups) !== JSON.stringify(mGroup)) {
            return { marketGroups: { ...mGroup } }
        }

        return null;
    }

    // selectMarkets = (markets, index) => {
    //     if (this.state.selectedMarkets[index] !== markets)
    //         this.setState(prevState => {
    //             return {selectedMarkets: {...prevState.selectedMarkets, [index]: markets}}
    //         })
    // }

    selectMarkets = (markets, index) => {
        if (this.state.selectedMarkets[index] !== markets)
            this.setState(prevState => {
                prevState.selectedMarkets[index] = markets;
                return { ...prevState, selectedMarkets: { ...prevState.selectedMarkets } }
            })
    };



    handleClose = (index) => {
        let tournament = this.props.state.currentTournamentData[index].tournament.tournamentId;
        if (this.props.state.currentTournamentData.some(e => e.tournament.tournamentId === tournament)) {
            let toDelete = { tournament: { tournamentId: tournament } }
            this.props.dispatch({ type: 'TOURNAMENT_COUNTER_SUB' });
            this.props.dispatch({ type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete })
            this.props.dispatch({ type: 'CLEAR_TOURNAMENT_ID', payload: tournament })
            this.props.dispatch({ type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: tournament })
        }
    }

    viewTemplate = (group, index) => {
        const { currentTournamentData } = this.props.state;

        switch (group) {
            case 'BMG_ASIAN':
                return <Asian />
            case 'BMG_1H_CS':
                return <Bmg1hCs market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} />
            case 'BMG_CORRECTSCORE':
                return <BmgCorrectScore market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} />
            case 'BMG_OUTRIGHT':
                return <BmgOutright market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} />
            default:
                return <MatchData market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} />
        }
    }

    render() {
        const {currentTournamentData} = this.props.state;
        return (
            <Fragment>
                {
                    (this.props.state.tournamentCounter.currentTournamentCounter === 0)&&(isWidthUp('md', this.props.width))?
                        <TopTournaments/>
                        :
                        ((Array.isArray(currentTournamentData))&& (this.props.state.tournamentCounter.currentTournamentCounter !==0 || !this.props.state.tournamentCounter.currentTopTournament)   ?
                            currentTournamentData.map((e, index) => {
                                return (
                                    <Fragment key={index}>
                                        <CategoriesFilter
                                            initialSelect={(currentTournamentData[index].tournament.value[0].isOutrightType) ? ['BMG_OUTRIGHT'] : ['BMG_MAIN']}
                                            isOutright={currentTournamentData[index].tournament.value[0].isOutrightType}
                                            resize={this.props.resize}
                                            index={index}
                                            handleClose={this.handleClose}
                                            selectededMarkets={this.selectMarkets}
                                            categories={this.state.marketGroups[index]}
                                            sport={currentTournamentData[index].tournament.value[0].sportdescriptor}
                                            title={currentTournamentData[index].tournament.value[0].sportdescriptor + ' / '
                                                + currentTournamentData[index].tournament.value[0].country + ' / '
                                                + currentTournamentData[index].tournament.value[0].tournament
                                            }
                                        />

                                        {
                                            (this.state.selectedMarkets[index])
                                                ? this.state.selectedMarkets[index].map((e, i) => {
                                                    return this.viewTemplate(e, index)
                                                })
                                                : null
                                        }
                                    </Fragment>
                                )
                            })
                            :
                            <TopTournaments /> )

                }
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
            topTournaments: state.sportList.top_tournaments,
            matchCategoriesSelected: state.matchCategoriesSelected,
            sportList: state.sportList,
            activeCategory: state.activeCategory,
            sportId: state.sportId,
            tournamentsData: state.tournamentsData,
            tournamentCounter: state.topTournament,
        }
    }
}

export default connect(mapStateToProps)(withWidth()(SportMatchBoard))


/*

            <Fragment>
                {
                    (this.props.state.tournamentCounter.currentTournamentCounter === 0)&&(isWidthUp('md', this.props.width)) ? (<TopTournaments/>) :
                        ((Array.isArray(currentTournamentData)) ?
                            currentTournamentData.map((e, index) => {
                                return (
                                    <Fragment key={index}>
                                        <CategoriesFilter
                                            initialSelect={(currentTournamentData[index].tournament.value[0].isOutrightType) ? ['BMG_OUTRIGHT'] : ['BMG_MAIN']}
                                            isOutright={currentTournamentData[index].tournament.value[0].isOutrightType}
                                            resize={this.props.resize}
                                            index={index}
                                            handleClose={this.handleClose}
                                            selectededMarkets={this.selectMarkets}
                                            categories={this.state.marketGroups[index]}
                                            sport={currentTournamentData[index].tournament.value[0].sportdescriptor}
                                            title={currentTournamentData[index].tournament.value[0].sportdescriptor + ' / '
                                            + currentTournamentData[index].tournament.value[0].country + ' / '
                                            + currentTournamentData[index].tournament.value[0].tournament
                                            }
                                        />

                                        {
                                            (this.state.selectedMarkets[index])
                                                ? this.state.selectedMarkets[index].map((e, i) => {
                                                    return this.viewTemplate(e, index)
                                                })
                                                : null

                                        }
                                    </Fragment>
                                )
                            })
                            : null)

                }
            </Fragment>

* */