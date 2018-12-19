import React, {Fragment, Component} from 'react';
import {connect} from "react-redux";

import Match from './Match';
import TopSidebar from 'view/components/MainContainer/MatchContents/TopSidebar/CategoriesMenuLive';

// import Hidden from '@material-ui/core/Hidden';

class LiveMatchBoard extends Component {

    state = {};

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("LiveMatchBoard update")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        /*if(JSON.stringify(nextProps.state.country) !== JSON.stringify(this.props.state.country)){
            console.log("Country update")
        }
        if(JSON.stringify(nextProps.state.liveMenu) !== JSON.stringify(this.props.state.liveMenu)){
            console.log("Live menu update")
        }

        if(JSON.stringify(nextProps.state.sportId) !== JSON.stringify(this.props.state.sportId)){
            console.log("SportId update")
        }
        if(JSON.stringify(nextProps.state.liveMatches) !== JSON.stringify(this.props.state.liveMatches)){
            console.log("Live Matches update")
        //    console.log(this.props.state)
        }*/

        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false;
        } else {
            return true
        }


    }


    prepareCategoryData = () => {
        let result = [];
        let sortKeys = ["Soccer", "Tennis", "Basketball", "Ice Hockey", "Rugby", "Volleyball", "Handball"];
        let liveMenu = this.props.state.liveMenu;

        sortKeys.forEach(function (key) {
            liveMenu.filter(function (item) {
                if (item.sportname == key) {
                    result.push(item);
                    return false;
                } else
                    return true;
            })
        })
        return result;
    }

    render() {
        const liveMenu = this.prepareCategoryData();
        return (
            <Fragment>

                <TopSidebar/>

                {liveMenu
                    .filter(e => {
                        if (this.props.state.sportId !== '')
                            return (
                                e.sportname === this.props.state.sportId
                            )
                        else
                            return true
                    })
                    .map((sport, index) => {
                        if (this.props.state.liveMatches.filter(e => e.sportname === sport.sportname).length > 0)
                            return (
                                <section key={index}>
                                    <div className="category-live__container">
                                        <div className="tournament-group__header cp scroll-watcher">
                                            <div className={"tournament__title " + sport.sportname.replace(' ', '')}>
                                                <i className={"cell icon-cell " + sport.sportname.replace(' ', '')}></i>
                                                <div className="cell title-cell">{sport.sportname}</div>
                                                <div className="cell controls-cell">
                                                    <div className="count">
                                                        {this.props.state.liveMatches.filter(e => e.sportname === sport.sportname).length}
                                                    </div>
                                                    <div className="hide-block live icon-cell" title="Show/Hide"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.props.state.liveMatches
                                                .filter(e => {
                                                    if (this.props.state.country)
                                                        return (e.sportname === sport.sportname && e.country === this.props.state.country)
                                                    return (e.sportname === sport.sportname)

                                                })
                                                .sort((a, b) => {
                                                    if (a.matchminute > b.matchminute)
                                                        return -1
                                                    else if (a.matchminute < b.matchminute)
                                                        return 1
                                                    else
                                                        return 0
                                                })
                                                .map((match, index) => {

                                                    return (
                                                        <div key={index}>
                                                            {
                                                                <Match match={match}
                                                                    matchid={match["matchid"]}
                                                                />
                                                            }
                                                        </div>
                                                    )
                                                })
                                        }


                                    </div>
                                </section>
                            )
                    })}
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    let test = Object.values(state.liveMatches).map(function (item) {
        return (({sportname, country, matchid}) => ({sportname, country, matchid}))(item);
    });
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)
    //test = test.concat(test)

    return {
        state: {
            sportId: state.sportId,
            country: state.country,
            liveMatches: test,
            liveMenu: state.liveMenu,

        }
    }
}


export default connect(mapStateToProps)(LiveMatchBoard);