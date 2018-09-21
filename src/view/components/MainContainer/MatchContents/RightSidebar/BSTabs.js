import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';


class BSTabs extends Component {
    state = {
        stakeCouter: 0,
    }

    handleChangeTab = (tabsValue, st) => {
        this.props.dispatch({ type: 'BETS_TABS', payload: tabsValue })
        this.setState({ stakeCouter: st });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="bs-tabs">
                <Tabs
                    value={this.props.state.betSlip.tab}
                    onChange={(e, val) => this.handleChangeTab(val)}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                        label="Single"
                    />
                    {(this.props.tipSize > 1)
                        ? <Tab 
                            disableRipple 
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                            label="Multiple"
                        />
                        : (this.props.state.betSlip.tab === 1) ? (() => this.handleChangeTab(0,0))() : null
                    }
                    {(this.props.tournamentsCount > 2)
                        ? <Tab
                            disableRipple
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected, label: classes.label, labelContainer: classes.labelContainer }}
                            label="System"
                        />
                        : (this.props.state.betSlip.tab === 2) ? (() => this.handleChangeTab(1,1))() : null
                    }
                    {(this.props.tipSize === 2 && this.props.state.betSlip.tab === 0 && this.state.stakeCouter === 0)
                        ? (() => this.handleChangeTab(1, 1))()
                        : null
                    }
                </Tabs>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
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

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
            bsTabs: state.bsTabs,
            betList: state.betList,
            betSlip: state.betSlip,
            odds: state.odds,
            tournamentsData: state.tournamentsData,
            liveMatches: state.liveMatches,
        }
    }
}

BSTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(BSTabs))