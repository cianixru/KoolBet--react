import React, { Fragment } from 'react';
import { connect } from "react-redux";

import CategoriesFilter from './CategoriesFilter';
import MatchData from './MatchData';

class SportMatchBoard extends React.PureComponent {

    state = { marketGroups: {}, selectedMarkets: {} }

    selectMarkets = (markets, index) => {
        if (this.state.selectedMarkets[index] != markets)
            this.setState(prevState => {
                prevState.selectedMarkets[index] = markets;
                return { ...prevState, selectedMarkets: { ...prevState.selectedMarkets } }
            })
    }

    handleClose = (index) => {
        let tournament = this.props.state.currentTournamentData[index].tournament.tournamentId;
        if (this.props.state.currentTournamentData.some(e => e.tournament.tournamentId == tournament)) {
            let toDelete = { tournament: { tournamentId: tournament } }
            this.props.dispatch({ type: 'CLEAR_TOURNAMENT_ID' });
            this.props.dispatch({ type: 'DELETE_TOURNAMENTS_DATA', payload: toDelete })
            this.props.dispatch({ type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete })
        }
    }

    render() {
        // console.log(this.state.marketGroups);

        let mGroup = {};
        if (Array.isArray(this.props.state.currentTournamentData)) {
            this.props.state.currentTournamentData.map((e, index) => {
                let sortGroup = {};
                e.tournament.value.map(tournament => {
                    tournament.groups.map(group => {
                        if (sortGroup[group.sort] != group.id) {
                            sortGroup[group.sort] = group.id
                        }
                    });
                })
                mGroup[index] = Object.values(sortGroup)
            })
        }

        if (JSON.stringify(this.state.marketGroups) != JSON.stringify(mGroup)) {
            this.setState(state => {
                return {
                    ...state,
                    marketGroups: { ...mGroup },
                }
            });
        }

        return (
            <Fragment>
                {
                    (Array.isArray(this.props.state.currentTournamentData)) ?
                        this.props.state.currentTournamentData.map((e, index) => {
                            return (
                                <Fragment key={index}>

                                    <CategoriesFilter
                                        resize={this.props.resize}
                                        index={index}
                                        handleClose={this.handleClose}
                                        selectededMarkets={this.selectMarkets}
                                        categories={this.state.marketGroups[index]}
                                        sport={this.props.state.currentTournamentData[index].tournament.value[0].sportdescriptor}
                                        title={this.props.state.currentTournamentData[index].tournament.value[0].sportdescriptor + ' / '
                                            + this.props.state.currentTournamentData[index].tournament.value[0].country + ' / '
                                            + this.props.state.currentTournamentData[index].tournament.value[0].tournament
                                        }
                                    />
                                    {
                                        (this.state.selectedMarkets[index])
                                            ? this.state.selectedMarkets[index].map((e, i) => {
                                                return (
                                                    (this.state.marketGroups[index] && this.state.marketGroups[index].length > 0 && this.state.marketGroups[index].includes(e))
                                                        ? <MatchData market={this.props.state.currentTournamentData[index]} marketGroup={e} key={i} />
                                                        : null
                                                )
                                            })
                                            : null
                                    }
                                </Fragment>
                            )
                        })
                        : null
                }


            </Fragment >
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
        }
    }
}

export default connect(mapStateToProps)(SportMatchBoard)