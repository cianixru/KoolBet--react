import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CategoriesMenuVirtual extends PureComponent {

    handleMenuChoose = (sport) => {
        if (sport !== this.props.state.sportId)
            this.props.dispatch({ type: 'CLEAR_CURRENT_VIRTUAL_TOURNAMENT_DATA' })
        this.props.dispatch({ type: 'ADD_VIRTUAL_SPORT_ID', payload: sport })
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <div className={classes.root}>
                    {(this.props.state.sportList.length>0 && this.props.state.virtualCurrentTournamentData.sport)
                    ? <Tabs
                        value={this.props.state.virtualCurrentTournamentData.sport}
                        scrollable
                        scrollButtons="on"
                        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator, scrollButtons: classes.scrollButtons }}
                    >

                        {Array.isArray(this.props.state.sportList) ?
                            this.props.state.sportList.map((menuItem, index) => {
                                    return (
                                        <Tab key={index} value={menuItem} classes={{ root: classes.tabRoot, label: classes.tabLabel, selected: classes.selected, labelContainer: classes.labelContainer, wrapper: classes.wrapper }} className="sportmenu--live__item" label={<span className="title" title={menuItem.sportname}>{menuItem}</span>} icon={<i className={menuItem.replace(' ', '')}></i>} onClick={() => this.handleMenuChoose(menuItem)} />
                                    )
                            }
                            ) : null}
                    </Tabs>
                    : null
                    }
                </div>

            </Fragment>
        )
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
        '& svg': {
            fill: '#ffbf00',
            fontSize: 40,
        }
    },
    SubTabsScrollButtons: {
        flex: 0,
        width: 35,
        '& svg': {
            fill: '#ffbf00',
            fontSize: 35,
        }
    },

    bsNone: {
        boxShadow: 'none',
    },
    selectedAll: {
        color: '#ffbf00!important',
        position: 'relative',
        '& i:before': {
            color: '#ffbf00!important',
        },
    },
    selected: {
        color: '#ffbf00!important',
        position: 'relative',
        '& i:before': {
            color: '#ffbf00!important',
        },
    },

    tabsRoot: {
        borderBottom: '0px solid #17181f',
        position: 'relative',

    },
    tabsIndicator: {
        backgroundColor: 'transparent',
    },
    tabLabel: {
        // padding: '0 5px',
        fontSize: '11px!important',
        letterSpacing: '.3px',
        textOverflow: 'ellipsis',
    },
    labelContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 0,
    },
    tabRoot: {
        minHeight: 60,
        minWidth: 72,
        fontFamily: 'inherit',
        color: '#fff',
        '&:hover': {
            color: '#fff',
            opacity: 1,
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
            sportList: state.virtualSportList,
            sportId: state.virtualSportId,
            virtualCurrentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CategoriesMenuVirtual));
