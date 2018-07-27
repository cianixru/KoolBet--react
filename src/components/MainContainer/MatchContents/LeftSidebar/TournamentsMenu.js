import React from 'react';
import { connect } from "react-redux";

class TournamentsMenu extends React.Component {

    changeCategory = (e, val) => {
        this.props.state.TournamentsSelected != ''
            ? this.onTournamentCheck
            : '';
        this.props.state.TournamentsSelected.includes(val) ?
            this.onTournamentRemove(val) :
            this.onTournamentAdd(val)
    }

    onTournamentAdd = (category) => {
        this.props.dispatch({ type: 'ADD_TOURNAMENTS', payload: category })
    }

    onTournamentRemove = (category) => {
        this.props.dispatch({ type: 'CLEAR_TOURNAMENTS', payload: category })
    }

    onTournamentCheck = () => {
        this.props.dispatch({ type: 'CLEAR_CATEGORY_LIST' })
    }

    render() {
        let tournaments = [
            { title: 'UEFA Champions League', count: 1 },
            { title: 'UEFA Europa League', count: 2 },
            { title: 'International Friendly Games', count: 1 },
            { title: 'LaLiga', count: 11 },
            { title: 'Serie A', count: 5 },
            { title: 'Ligue 1', count: 15 },
            { title: 'AFC Champions League', count: 3 }
        ];
        return (
            <div className="top-tournaments">
                <div className="header__sport-menu tournaments-menu__title" id="tournaments-menu__title">
                    <i className="arr-down"></i>
                    <div className="sport-menu__title">TOP TOURNAMENTS</div>
                </div>
                <ul className="sport-menu scroll-watcher tournaments-menu" id="tournaments-menu">
                    {
                        tournaments.map((val, index) => {
                            return <li
                                onClick={e => this.changeCategory(e, val.title)}
                                className={(this.props.state.TournamentsSelected == val.title) ? 'active' : ''}
                            >
                                <a className="sport-menu__item">
                                    <i className="soccer"></i>
                                    <span className="title" title={val.title}>{val.title}</span>
                                    <span className="count">{val.count}</span>
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage,
            matchCategoriesSelected: state.matchCategoriesSelected,
            TournamentsSelected: state.TournamentsSelected,
        }
    }
}

export default connect(mapStateToProps)(TournamentsMenu)