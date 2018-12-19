import React, { Component, Fragment } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import WinPlace from './Place';
import Forecast from './Forecast';
import Tricast from './Tricast';

/*jshint ignore:start*/
/*eslint-disable*/
class RaceMatchList extends Component {

    state = { tab: 0 }

    handleTabChange = (e, tab) => {
        this.setState({ tab });
    }

    render() {
        const { classes } = this.props;
        let closed = this.props.matchData.liveBetStatus === 15;
        let getTab = () => {
            switch (this.state.tab) {
                case 0: {
                    return <WinPlace handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} closed={closed}/>
                }
                case 1: {
                    return <Forecast handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} closed={closed}/>
                }
                case 2: {
                    return <Tricast handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} closed={closed}/>
                }
                default:
                    null
                    break;
            }
        }
        let tabsNames = ["Win / Place", "Forecast", "Tricast"]
        return (
            <Fragment>
                <Tabs 
                    className="race-bet__tab"
                    value={this.state.tab}
                    onChange={this.handleTabChange} 
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator, flexContainer: classes.flexContainer }}
                >
                    {tabsNames.map((val, index) => {
                        return (
                            <Tab label={val} key={index} classes={{ root: classes.tabRoot, label: classes.tabLabel, selected: classes.selected, labelContainer: classes.labelContainer, wrapper: classes.wrapper }} className="sportmenu--live__item" />
                        )
                    })}
                </Tabs>

                {getTab()}

            </Fragment>
        );
    }
}


const styles = theme => ({
    root: {
    },
    selected: {
        color: '#ffbf00!important',
    },
    flexContainer: {
        flex: '1 1 auto',
    },
    tabsRoot: {
        position: 'relative',
    },
    tabsIndicator: {
        backgroundColor: '#ffbf00',
        height: 3
    },
    tabLabel: {
        fontSize: 14,
        textOverflow: 'ellipsis',
    },
    tabRoot: {
        minHeight: 40,
        minWidth: 72,
        maxWidth: '99.9%',
        fontFamily: 'inherit',
        color: '#fff',
        '&:hover': {
            color: '#fff',
            opacity: 1,
        },
        '&:focus': {
            color: '#fff',
        },
    },
});

/*eslint-enable*/
/*jshint ignore:end*/
export default withStyles(styles)(RaceMatchList);