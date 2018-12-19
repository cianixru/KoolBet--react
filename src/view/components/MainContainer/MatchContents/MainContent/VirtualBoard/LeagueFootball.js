import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";
import MatchData from "./MatchData";
import CategoriesFilter from "./CategoriesFilter";

class LeagueFootball extends PureComponent {

    state = {count: 0, marketGroups: {}, selectedMarkets: [], markets: [] }; //TODO: initial category



    static getDerivedStateFromProps(props, state) {

        let mGroup = [];
        let marketArr = {};

        props.state.currentTournamentData.tournament.betdomainGroups.map((betdomainGroup, index) => {
            // let sortGroup = {};
            mGroup[index] = { id: betdomainGroup.name, txt: betdomainGroup.fullName, txts: betdomainGroup.shortName, betdomainIds: betdomainGroup.betdomainIds };
            // mGroup[index] = Object.values(sortGroup)
        });

        // if (Array.isArray(props.state.currentTournamentData)) {
        //     props.state.currentTournamentData.map((e, index) => {
        //         let sortGroup = {};
        //         e.tournament.value.map(tournament => {
        //             tournament.groups.map(group => {
        //                 sortGroup[group.sort] = {id: group.id, txt: group.txt, txts: group.txts}
        //             });
        //         })
        //         mGroup[index] = Object.values(sortGroup)
        //     })
        // }

        props.matchData.matchs.map(match => {
            match.betdomains.map((market, index) => {
                if (!state.markets.some(e => e.bettitle === market.betTitle))
                    marketArr[index] = market
            });
        });

        if (JSON.stringify(state.marketGroups) !== JSON.stringify(mGroup)) {
            return {
                marketGroups: mGroup ,
                prevMatchData: props.matchData,
                markets: Object.values(marketArr)
            }
        }

        return {
            prevMatchData: props.matchData,
        }
    }

    selectMarkets = (markets) => {
        if (this.state.selectedMarkets !== markets)
            this.setState(prevState => {
                console.log(this.state.count++);
                prevState.selectedMarkets = markets;
                return { ...prevState, selectedMarkets: [ ...prevState.selectedMarkets ] }
            })
    };

    viewTemplate = (group) => {
        const {currentTournamentData} = this.props.state;
        return <MatchData matchData={this.props.state.currentTournamentData.tournament}
                          tournament={currentTournamentData}
                          marketGroup={this.state.marketGroups.find(el => el.id === group)}
                          closed = {this.props.closed}/>
                          // handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.props.handleOddClick(oddId, betDomainId, matchId, tournamentId)}/>
    };

    render() {
        // let closed = false;
        // if (Object.keys(this.props.state.currentTournamentData).length !== 0 && this.props.state.currentTournamentData.tournament) {
        //     matchData = this.props.state.currentTournamentData.tournament.matchs[0];
        //     closed = matchData.startDate < (Date.now() + this.props.state.nowDiff)
        // }
        let tournament = this.props.matchData;
        return (
            <section>
                <Fragment>
                    <CategoriesFilter
                        initialSelect={['BMG_MAIN']}
                        selectededMarkets={this.selectMarkets}
                        categories={this.state.marketGroups}
                        sport={tournament.defaultName}
                        title={tournament.defaultName}
                    />

                    {
                        (this.state.selectedMarkets)
                            ? this.state.selectedMarkets.map((e, i) => {
                                return this.viewTemplate(e)
                            })
                            : null

                    }
                </Fragment>
            </section>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
            currentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}

export default connect(mapStateToProps)(LeagueFootball);