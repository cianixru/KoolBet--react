import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

class BSTabs extends Component {
    state = {
        tabState: 0,
    }

    handleChangeTab = (tabsValue, st) => {
        this.props.dispatch({ type: 'CURRENT_TAB', payload: tabsValue })
        this.setState({ tabState: st });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.state.betSlip.currentTab===2&&prevProps.state.betSlip.currentTab!==2)||(this.props.state.betSlip.currentTab===2 && this.props.state.betList.matchObj.length !== prevProps.state.betList.matchObj.length) ){
            let matchObjArr = this.props.state.betList.matchObj;

            for(let i=0;i<matchObjArr.length;i++){
                let counter  = 0;
                counter = matchObjArr.reduce(function(c, current) {
                   //console.log("current.TournamentId",current.TournamentId);
                   //console.log("matchObjArr[i].tournamentId",matchObjArr[i].TournamentId);

                    if(current.MatchId===matchObjArr[i].MatchId)
                        c++;
                    return c;
                }, 0);
                if(counter>1){
                    console.log(counter)
                    this.props.dispatch({ type: 'CURRENT_TAB', payload: 1 });
                    break;
                }
            }


        }
    }

    render() {
        const { classes } = this.props;
        const { betList, betSlip } = this.props.state;
        return (
                <Tabs
                    value={betSlip.currentTab}
                    onChange={(e, val) => this.handleChangeTab(val)}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    {(betList.tipSize > 0)
                        ? <Tab
                            disableRipple
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                            label="Single"
                        />
                        : null
                    }
                    {(betList.tipSize > 1)
                        ? <Tab
                            disableRipple
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                            label="Multiple"
                        />
                        : (betSlip.currentTab === 1) ? (() => this.handleChangeTab(0, 0))() : null
                    }
                    {(betList.tournamentsCount.length > 2)
                        ? <Tab
                            disableRipple
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                            label="System"
                        />
                        : (betSlip.currentTab === 2) ? (() => this.handleChangeTab(1, 1))() : null
                    }
                    {(betList.tipSize === 2 && betSlip.currentTab === 0 && this.state.tabState === 0)
                        ? (() => this.handleChangeTab(1, 1))()
                        : null
                    }
                </Tabs>
        );
    }
}

const styles = theme => ({
    tabsRoot: {
        minHeight: 36,
        backgroundColor: '#4e4f58',
    },
    tabsIndicator: {
        borderTop: '3px solid #ffbf00',
        backgroundColor: '#1c1f29',
        top: 0,
        height: '100%',
    },
    labelContainer: {
        fontSize: 14,
        padding: 8,
        letterSpacing: .2,
    },
    label: {
        fontSize: 14,
        [theme.breakpoints.up('md')]: {
            fontSize: 14,
        },
    },
    tabRoot: {
        minHeight: 36,
        position: 'relative',
        zIndex: '2',
        marginTop: 2,
        textTransform: 'uppercase',
        minWidth: 22,
        maxWidth: '100%',
        color: '#fff',
        transition: 'border .2s',
        flex: '1 1',
        width: 'auto',
        fontFamily: ['Roboto Condensed'].join(','),
        '&:hover': {
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#ffbf00',
        },
    },
    tabSelected: {},
});

const mapStateToProps = (state) => {
    return {
        state: {
            betList: state.betList,
            betSlip: state.betSlip,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BSTabs))