import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CategoriesMenuLive extends PureComponent {
    state = {
        value: this.props.state.sportId || "all",
    };

    prepareCategoryData = () => {
        let result = [];
        let sortKeys = ["Soccer","Tennis","Basketball","Ice Hockey","Rugby","Volleyball","Handball"];
        let liveMenu = this.props.state.liveMenu;
        sortKeys.forEach((key)=>{
            liveMenu.filter(function(item) {
                if(item.sportname == key) {
                    result.push(item);
                    return false;
                } else
                    return true;
            })
        })
        return result;
    }

    handleMenuChoose = (sport) => {
        this.setState({ ...this.state, value: sport });
        this.props.dispatch({ type: 'CLEAR_COUNTRY' })
        if (sport === "all")
            this.props.dispatch({ type: 'CLEAR_SPORT_ID' })
        else
            this.props.dispatch({ type: 'ADD_SPORT_ID', payload: sport })
    }

    handleSubMenuChoose = (country) => {
        if (this.props.state.country === country)
            this.props.dispatch({ type: 'CLEAR_COUNTRY' })
        else
            this.props.dispatch({ type: 'ADD_COUNTRY', payload: country })


    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { country } = this.props.state;
        const liveMenu = this.prepareCategoryData();
        return (
            <Fragment>
                <div className={classes.root}>
                    {(value)
                        ?
                        <Tabs
                            value={value}
                            scrollable
                            scrollButtons="on"
                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator, scrollButtons: classes.scrollButtons }}
                        >
                            <Tab classes={{ root: classes.tabRoot, label: classes.tabLabel, selected: classes.selectedAll, labelContainer: classes.labelContainer }} className="sportmenu--live__item" value="all" label={<Fragment><span className="title" title="All Sports">All Sports</span><span className="count">{Object.values(this.props.state.liveMatches).length}</span></Fragment>} icon={<i className="all_sports"></i>} onClick={() => this.handleMenuChoose("all")} />
                            {liveMenu.map((menuItem, index) => {

                                if (Object.values(this.props.state.liveMatches).filter(e => e.sportname === menuItem.sportname).length > 0)

                                    return (
                                        <Tab key={index} value={menuItem.sportname} classes={{ root: classes.tabRoot, label: classes.tabLabel, selected: classes.selected, labelContainer: classes.labelContainer, wrapper: classes.wrapper }} className="sportmenu--live__item" label={<Fragment><span className="title" title="{menuItem.sportname}">{menuItem.sportname}</span><span className="count">{Object.values(this.props.state.liveMatches).filter(e => e.sportname === menuItem.sportname).length}</span></Fragment>} icon={<i className={menuItem.sportname.replace(' ', '')}></i>} onClick={() => this.handleMenuChoose(menuItem.sportname)} />
                                    )
                            })}
                        </Tabs>
                        : null}
                    {(liveMenu.some(e => e.sportname === value))
                        ?
                        <Tabs
                            value={country || false}
                            scrollable
                            scrollButtons="on"
                            classes={{ indicator: classes.tabsIndicator, scrollButtons: classes.SubTabsScrollButtons, root: classes.subRoot }}
                            className="sub-tabs--live"
                        >
                            {
                                liveMenu.find(e => e.sportname === value).country.map((menuItem, index) => {

                                    if (Object.values(this.props.state.liveMatches).filter(e => e.country === menuItem).length > 0)

                                        return (
                                            <Tab key={index} value={menuItem} classes={{ root: classes.subTabsRoot, label: classes.subTabLabel, selected: classes.subTabsRootSelected, labelContainer: classes.subTabLabelContainer }} className="item" label={menuItem} onClick={() => this.handleSubMenuChoose(menuItem)} />
                                        )

                                })
                            }
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
        '&::before': {
            opacity: 1,
            display: 'block',
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            borderBottom: '5px solid #17181f',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            width: 0,
        },
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
        minHeight: 70,
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
    subRoot: {
        minHeight: 30,
    },
    subTabsRootSelected: {
        color: '#000!important',
        backgroundColor: '#ffbf00!important',
    },
    subTabsRoot: {
        opacity: 1,
        minHeight: 20,
        minWidth: 60,
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
    subTabLabel: {
        padding: '0 5px',
        fontSize: '12px',
        letterSpacing: '.3px',
        textOverflow: 'ellipsis',

    },
    subTabLabelContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
    },

});

function mapStateToProps(state) {
    return {
        state: {
            sportId: state.sportId,
            country: state.country,
            liveMatches: state.liveMatches,
            liveMenu: state.liveMenu,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CategoriesMenuLive));
