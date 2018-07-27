import React from 'react';
import { connect } from "react-redux";

class CategoriesMenuLive extends React.Component {
    render() {
        return (
            <div className="categories-menu__container mini scroll" id="sportMenuContainer">
                <div className="categories-menu__inner">
                    <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                        <div className="sport-menu__title">Live</div>
                        <div className="sport-menu__collapse-mini" id="sportMenuMiniToggler"></div>
                    </div>

                    <ul className="sport-menu scroll-watcher">
                        <li>
                            <a className="sport-menu__item">
                                <i className="soccer"></i>
                                <span className="title" title="Soccer">Soccer</span>
                                <span className="count">85</span>
                            </a>
                            <ul className="sport-submenu__events-menu">
                                <li>
                                    <a className="icon active-tournament">
                                        <span className="title">Challenger</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon">
                                        <span className="title">Challenger</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon">
                                        <span className="title">Challenger</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="american_football"></i>
                                <span className="title">American football</span>
                                <span className="count">72</span>
                            </a>
                            <ul className="sport-submenu__events-menu">
                                <li>
                                    <a className="icon active-tournament">
                                        <span className="title">Brasileiro Serie B</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon">
                                        <span className="title">Brasileiro Serie B</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="icon">
                                        <span className="title">Brasileiro Serie B</span>
                                        <span className="count">2</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="baseball"></i>
                                <span className="title">Baseball</span>
                                <span className="count">11</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="basketball"></i>
                                <span className="title">Basketball</span>
                                <span className="count">2</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="darts"></i>
                                <span className="title">Darts</span>
                                <span className="count">3</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="handball"></i>
                                <span className="title">Handball</span>
                                <span className="count">15</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="ice_hockey"></i>
                                <span className="title">Ice hockey</span>
                                <span className="count">20</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="rugby"></i>
                                <span className="title">Rugby</span>
                                <span className="count">14</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="snooker"></i>
                                <span className="title">Snooker</span>
                                <span className="count">7</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="tennis"></i>
                                <span className="title">Tennis</span>
                                <span className="count">21</span>
                            </a>
                        </li>
                        <li>
                            <a className="sport-menu__item">
                                <i className="volleyball"></i>
                                <span className="title">Volleyball</span>
                                <span className="count">51</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            matchCategories: state.matchCategories,
            liveCategories: state.liveCategories,
            currentPage: state.currentPage,
            matchCategoriesSelected: state.matchCategoriesSelected,
        }
    }
}

export default connect(mapStateToProps)(CategoriesMenuLive)