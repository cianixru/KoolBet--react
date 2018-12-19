import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Countdown from 'react-countdown-now';
import StreemVideo from './StreemVideo';


class TournamentList extends PureComponent {
    state = {
        value: this.props.state.sportId,
    };

    render() {
        const { classes } = this.props;
        // const { value } = this.state;
        const { tournamentId, currentTournamentData, sportId, tournamentList, nowDiff } = this.props.state;
        let now = Date.now() + nowDiff;
        let next = true;

        let curData;
        if (Object.keys(currentTournamentData).length !== 0)
            curData = currentTournamentData;
        if (currentTournamentData[0] && currentTournamentData[0].hasOwnProperty('value'))
            curData = null;

        return (
            <Fragment>
                <StreemVideo curData={curData} sportId={sportId} />

                <section className="timeline__wp">
                    <nav className="timeline">
                        <div className="nav-tabs">
                            {(tournamentId)
                                ?
                                <Tabs
                                    value={tournamentId}
                                    scrollable
                                    scrollButtons="on"
                                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator, scrollButtons: classes.scrollButtons }}

                                >
                                    {Object.keys(tournamentList).map((key, index) => {
                                        let accFirst = tournamentList[key].first + nowDiff
                                        let start = new Date(accFirst)
                                        if (Date.now() < tournamentList[key].second) {
                                            return (
                                                <Tab key={index}
                                                    value={key}
                                                    className="nav-tabs__item"
                                                    label={
                                                        <div className="countdown__wrapper">
                                                            {(accFirst < now)
                                                                ?
                                                                <div className="countdown">
                                                                    Now
                                                                </div>
                                                                :
                                                                (accFirst > now && next)
                                                                    ?
                                                                    <div className="countdown">
                                                                        <Countdown
                                                                            date={accFirst}
                                                                            renderer={({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
                                                                                if (completed) {
                                                                                    this.forceUpdate()
                                                                                }
                                                                                return minutes + ':' + seconds
                                                                            }}
                                                                        />
                                                                        {next = false}
                                                                    </div>
                                                                    :
                                                                    null}
                                                            {start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                                        </div>

                                                    }
                                                    onClick={() => this.props.onTournamentChoose(key)}
                                                    classes={{ root: classes.tabRoot, label: classes.tabLabel, selected: classes.selected, labelContainer: classes.labelContainer }}
                                                />
                                            )
                                        }
                                    })}
                                </Tabs>
                                : null}
                        </div>
                    </nav>

                    {/*<header className="vg-meeting--info">*/}
                        {/*<div className="vg-meeting--details">*/}
                            {/*<time className="vg-meeting--time">*/}
                                {/*{(tournamentId && tournamentList[tournamentId])*/}
                                    {/*? new Date(tournamentList[tournamentId].first).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })*/}
                                    {/*: null*/}
                                {/*}*/}
                            {/*</time>*/}
                            {/*<h1 className="vg-meeting--title">*/}
                                {/*{(curData && curData.tournament)*/}
                                    {/*? curData.tournament.defaultName*/}
                                    {/*: null*/}
                                {/*}*/}
                            {/*</h1>*/}
                            {/*<div className="vg-meeting--id">ID:*/}
                                {/*{(curData && curData.tournament)*/}
                                    {/*? curData.tournament.tournamentId*/}
                                    {/*: null*/}
                                {/*}*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</header>*/}
                </section>
            </Fragment>
        );
    }
}


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '0 0 8px',
    },
    scrollButtons: {
        flex: 0,
        width: 35,
        minHeight: 50,
        background: 'rgba(255, 255, 255, 0.2)',
        '& svg': {
            fill: '#fff',
            fontSize: 40,
        }
    },
    bsNone: {
        boxShadow: 'none',
    },
    selected: {
        color: '#000!important',
        position: 'relative',
        background: '#ffbf00',
        '& i:before': {
            color: '#ffbf00!important',
        },
    },
    tabsRoot: {
        borderBottom: 0,
        position: 'relative',
    },
    tabsIndicator: {
        backgroundColor: 'transparent',
    },
    tabLabel: {
        padding: '0 5px',
        fontSize: '1rem!important',
        letterSpacing: '.3px',
        textOverflow: 'ellipsis',
    },
    labelContainer: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    tabRoot: {
        border: '1px solid rgba(255, 255, 255, 0.2)',
        minHeight: 50,
        minWidth: 60,
        fontFamily: 'inherit',
        color: 'rgba(255, 255, 255, .7)',
        opacity: 1,
        '&:hover': {
            color: '#fff',
            '& i:before': {
                color: '#fff',
            }
        },
        '&:focus': {
            color: '#fff',
        },
    },
    tabRootFirst: {
        border: '1px solid rgba(255, 255, 255, 0.2)',
        minHeight: 50,
        minWidth: 60,
        fontFamily: 'inherit',
        color: 'rgba(255, 255, 255, .7)',
        opacity: 1,
        '&:hover': {
            color: '#fff',
            '& i:before': {
                color: '#fff',
            }
        },
        '&:focus': {
            color: '#fff',
        },
    },

});


function mapStateToProps(state) {
    return {
        state: {
            nowDiff: state.nowDiff,
            sportId: state.virtualSportId,
            tournamentList: state.virtualTournamentList,
            tournamentId: state.virtualTournamentId,
            currentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTournamentChoose: (tournamentId) => {
            dispatch({ type: 'ADD_VIRTUAL_TOURNAMENT_ID', payload: tournamentId });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentList));