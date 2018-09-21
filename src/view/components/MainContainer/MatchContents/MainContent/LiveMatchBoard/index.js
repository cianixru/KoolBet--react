import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";

import Match from './Match';

class LiveMatchBoard extends PureComponent {

    state = {};
    
    static getDerivedStateFromProps(props, state) {
        return {};
    }

    render() {
        return (
            <Fragment>
                {this.props.state.liveMenu
                    .filter(e => {
                        if (this.props.state.sportId != '')
                            return (
                                e.sportname == this.props.state.sportId
                            )
                        else
                            return true
                    })
                    .map((sport, index) => {
                        // console.log(this.props.state.liveMatches[sport]);
                        // if (this.props.state.liveMatches[sport].length > 0) //TODO: filter empty sports
                        return (
                            <section key={index} >
                                <div className="category-live__container">
                                    <div className="tournament-group__header cp scroll-watcher">
                                        <div className={"tournament__title " + sport.sportname.replace(' ', '')}>
                                            <i className={"cell icon-cell " + sport.sportname.replace(' ', '')}></i>
                                            <div className="cell title-cell">{sport.sportname}</div>
                                            <div className="cell controls-cell">
                                                <div className="count">1</div>
                                                <div className="hide-block live icon-cell" id="colps1" data-toggler=".expanded" title="Show/Hide"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        Object.values(this.props.state.liveMatches)
                                            .filter(e => {
                                                return (e.sportname == sport.sportname && e.Markets.length > 0)
                                            })
                                            .sort((a, b) => {
                                                if (a.matchminute > b.matchminute)
                                                    return -1
                                                else
                                                    return 1
                                            })
                                            .map((match, index) => {

                                                return (
                                                    <div key={index}>

                                                        {(index < 50)
                                                            ? <Match match={match} />
                                                            : null
                                                        }
                                                        {/* <Match/> */}
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
    return {
        state: {
            sportId: state.sportId,
            liveMatches: state.liveMatches,
            liveMenu: state.liveMenu,
        }
    }
}


export default connect(mapStateToProps)(LiveMatchBoard);