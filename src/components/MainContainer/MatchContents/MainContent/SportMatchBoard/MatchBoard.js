import React from 'react';
import { connect } from "react-redux";

class MatchBoard extends React.Component {
    clickMatch = (e, val) => {
        if (this.props.state.preMatches.includes(val)) {
            this.onMatchRemove('PRE', val)
        } else if (this.props.state.liveMatches.includes(val)) {
            this.onMatchRemove('LIVE', val)
        }
        else {
            if (this.props.state.currentPage === 0) {
                this.onMatchAdd('PRE', val)
            } else
                if (this.props.state.currentPage === 1) {
                    this.onMatchAdd('LIVE', val)
                }
        }

    }

    onMatchAdd = (matchType, match) => {
        this.props.dispatch({ type: 'ADD_' + matchType + '_MATCH', payload: match })
    }

    onMatchRemove = (matchType, match) => {
        this.props.dispatch({ type: 'DELETE_' + matchType + '_MATCH', payload: match })
    }

    render() {

        let currBoard;

        if (this.props.state.currentPage === 0) {
            currBoard = this.props.state.tableMatches.prematch
        }
        if (this.props.state.currentPage === 1) {
            currBoard = this.props.state.tableMatches.live
        }

        return (
            <div className="match-list">
                <ul id="bet_matches">
                    {this.props.state.matchCategoriesSelected.map((val, index) => {
                        if (currBoard && currBoard[val]) {
                            return (
                                <div key={index + '-' + val}>
                                    {currBoard[val].map((value, index) => {
                                        return (
                                            <li key={index + '-' + val}
                                                onClick={(e) => this.clickMatch(e, val + '-' + value)}
                                                className={
                                                    (this.props.state.preMatches.includes(val + '-' + value) || this.props.state.liveMatches.includes(val + '-' + value))
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                {val + '-' + value}
                                            </li>
                                        )
                                    })}
                                </div>
                            )
                        }
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage,
            tableMatches: state.tableMatches,
            preMatches: state.preMatches,
            liveMatches: state.liveMatches,
            matchCategories: state.matchCategories,
            liveCategories: state.liveCategories,
            matchCategoriesSelected: state.matchCategoriesSelected,
        }
    }
}

export default connect(mapStateToProps)(MatchBoard)